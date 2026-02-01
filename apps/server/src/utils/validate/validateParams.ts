import {
  validateAlphanumeric,
  validateBase64,
  validateCuid,
  validateDigits,
  validateEmail
} from './validate';
import { Result } from '@/types';

// バリデーションルールの型定義
// パラメータ付きルールはテンプレートリテラル型で型安全に定義
type ValidatorRule =
  | 'required' // 必須（null, undefined, 空文字を拒否）
  | 'nullable' // null/undefinedを許容（値がなければ他のルールをスキップ）
  | 'cuid' // CUID形式
  | 'string' // 文字列型
  | 'number' // 数値型（NaN除外）
  | 'alphanumeric' // 半角英数字のみ
  | 'base64' // base64画像形式
  | 'email' // メールアドレス形式
  | `min:${number}` // 最小値（string: 文字数, number: 値）
  | `max:${number}` // 最大値（string: 文字数, number: 値）
  | `digits:${number}`; // 固定桁数の数字文字列

// パラメータなしのバリデーション関数マップ
// key: ルール名, value: バリデーション関数
const validatorFns: Record<string, (value: unknown) => boolean> = {
  required: (v) => v != null && v !== '',
  cuid: (v) => typeof v === 'string' && validateCuid(v),
  string: (v) => typeof v === 'string',
  number: (v) => typeof v === 'number' && !Number.isNaN(v),
  alphanumeric: (v) => typeof v === 'string' && validateAlphanumeric(v),
  base64: (v) => typeof v === 'string' && validateBase64(v),
  email: (v) => typeof v === 'string' && validateEmail(v)
};

// ルール名からバリデーション関数を取得
// パラメータ付きルール（min:N, max:N, digits:N）はパースしてバリデーション関数を動的に生成する
const getValidator = (rule: ValidatorRule): ((value: unknown) => boolean) => {
  // min:N — string: 文字数の最小値, number: 値の最小値
  if (rule.startsWith('min:')) {
    const min = Number(rule.split(':')[1]);
    return (v) => {
      if (typeof v === 'string') return v.length >= min;
      if (typeof v === 'number') return v >= min;
      return false;
    };
  }

  // max:N — string: 文字数の最大値, number: 値の最大値
  if (rule.startsWith('max:')) {
    const max = Number(rule.split(':')[1]);
    return (v) => {
      if (typeof v === 'string') return v.length <= max;
      if (typeof v === 'number') return v <= max;
      return false;
    };
  }

  // digits:N — 固定N桁の数字文字列
  if (rule.startsWith('digits:')) {
    const digits = Number(rule.split(':')[1]);
    return (v) => typeof v === 'string' && validateDigits(v, digits);
  }

  // パラメータなしのルールはマップから取得
  return validatorFns[rule];
};

/**
 * ルール定義ベースのバリデーション関数
 * extractParamsFor~系の関数内で使用し、リクエストパラメータを検証する
 *
 * @param data 検証対象のデータ（request.params, request.body等）
 * @param rules フィールドごとのバリデーションルール（例: { userId: ['required', 'cuid'] }）
 *
 * @example
 * validateParams<{ userId: string; nickname: string }>(
 *   { ...request.params, ...request.body },
 *   {
 *     userId: ['required', 'cuid'],
 *     nickname: ['required', 'string', 'min:1', 'max:20']
 *   }
 * );
 */
export const validateParams = <T extends Record<string, unknown>>(
  data: Record<string, unknown>,
  rules: { [K in keyof T]: readonly ValidatorRule[] }
): Result<T, { errorCode: 400 }> => {
  // 全フィールドがルールを満たすかチェック
  const isValid = Object.entries(rules).every(([key, fieldRules]) => {
    // nullable判定: nullableルールがあり、値がnull/undefinedならスキップ
    const isNullable = fieldRules.includes('nullable');
    if (isNullable && data[key] == null) return true;

    // 各ルールを順番に検証（1つでも失敗したらfalse）
    return fieldRules.every((rule) => {
      if (rule === 'nullable') return true;
      return getValidator(rule)(data[key]);
    });
  });

  return isValid
    ? { success: true, data: data as T }
    : { success: false, error: { errorCode: 400 } };
};
