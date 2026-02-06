import {
  validateAlphaNumHyphen,
  validateAlphanumeric,
  validateArrayMax,
  validateArrayMin,
  validateBase64,
  validateBetween,
  validateBoolean,
  validateCuid,
  validateDate,
  validateDateFormat,
  validateDatetime,
  validateDigits,
  validateEmail,
  validateFile,
  validateHiragana,
  validateIn,
  validateInteger,
  validateKatakana,
  validateMax,
  validateMimeType,
  validateMin,
  validatePhoneNumber,
  validatePassword,
  validatePostalNo,
  validateRegex,
  validateUrl,
  validateUuid,
  validateExtensions,
  validateFileSizeMax,
  validateFileSizeMin,
  validateBase64SizeMax
} from './validate';
import { Result } from '@/types';

// バリデーションルールの型定義
// パラメータ付きルールはテンプレートリテラル型で型安全に定義
type ValidatorRule =
  | 'required' // 必須（null, undefined, 空文字を拒否）
  | 'nullable' // null/undefinedを許容（値がなければ他のルールをスキップ）
  | 'cuid' // CUID形式
  | 'uuid' // UUID形式
  | 'string' // 文字列型
  | 'number' // 数値型（NaN除外）
  | 'boolean' // ブール型
  | 'integer' // 整数型（小数を拒否）
  | 'alphaNumHyphen' // 半角英数字・ハイフンのみ
  | 'alphanumeric' // 半角英数字のみ
  | 'base64' // base64画像形式
  | 'email' // メールアドレス形式
  | 'date' // 日付形式（フォーマット不問）
  | `dateFormat:${string}` // 日付フォーマット（YYYY-MM-DD等）
  | 'datetime' // 日時形式（ISO 8601）
  | 'hiragana' // ひらがなのみ
  | 'katakana' // カタカナのみ
  | `min:${number}` // 最小値（string: 文字数, number: 値）
  | `max:${number}` // 最大値（string: 文字数, number: 値）
  | `between:${number},${number}` // 範囲（string: 文字数, number: 値）
  | `digits:${number}` // 固定桁数の数字文字列
  | `in:${string}` // 許可リストに含まれるか
  | 'postalNo' // 郵便番号（7桁数字）
  | 'mobilePhone' // 携帯電話番号（11桁）
  | 'landlinePhone' // 固定電話番号（10桁）
  | 'url' // URL（http/https）
  | 'password' // パスワード形式（大文字・小文字・数字・記号各1つ以上、8文字以上）
  | 'array' // 配列型
  | `arrayMin:${number}` // 配列の最小要素数
  | `arrayMax:${number}` // 配列の最大要素数
  | `extensions:${string}` // 拡張子チェック（例: extensions:jpg,png,gif）
  | `fileSizeMax:${string}` // 最大ファイルサイズ（例: 5MB）
  | `fileSizeMin:${string}` // 最小ファイルサイズ（例: 1KB）
  | `base64SizeMax:${string}` // base64画像の最大ファイルサイズ（例: 5MB）
  | `regex:${string}` // 正規表現パターン
  | 'file' // ファイルオブジェクト（@fastify/multipart形式）
  | `mimeType:${string}`; // MIMEタイプ（例: mimeType:image/jpeg,image/png）

// パラメータなしのバリデーション関数マップ
// key: ルール名, value: バリデーション関数
const validators: Record<string, (value: unknown) => boolean> = {
  required: (v) => v != null && v !== '',
  cuid: (v) => typeof v === 'string' && validateCuid(v),
  uuid: (v) => typeof v === 'string' && validateUuid(v),
  string: (v) => typeof v === 'string',
  number: (v) => typeof v === 'number' && !Number.isNaN(v),
  boolean: (v) => validateBoolean(v),
  integer: (v) => typeof v === 'number' && validateInteger(v),
  alphaNumHyphen: (v) => typeof v === 'string' && validateAlphaNumHyphen(v),
  alphanumeric: (v) => typeof v === 'string' && validateAlphanumeric(v),
  base64: (v) => typeof v === 'string' && validateBase64(v),
  email: (v) => typeof v === 'string' && validateEmail(v),
  date: (v) => typeof v === 'string' && validateDate(v),
  datetime: (v) => typeof v === 'string' && validateDatetime(v),
  hiragana: (v) => typeof v === 'string' && validateHiragana(v),
  katakana: (v) => typeof v === 'string' && validateKatakana(v),
  postalNo: (v) => typeof v === 'string' && validatePostalNo(v),
  mobilePhone: (v) => typeof v === 'string' && validatePhoneNumber('mobile', v),
  landlinePhone: (v) =>
    typeof v === 'string' && validatePhoneNumber('landline', v),
  url: (v) => typeof v === 'string' && validateUrl(v),
  password: (v) => typeof v === 'string' && validatePassword(v),
  array: (v) => Array.isArray(v),
  file: (v) => validateFile(v)
};

// ルール名からバリデーション関数を取得
// パラメータ付きルールはパースしてバリデーション関数を動的に生成する
const resolveValidator = (
  rule: ValidatorRule
): ((value: unknown) => boolean) => {
  // min:N — string: 文字数の最小値, number: 値の最小値
  if (rule.startsWith('min:')) {
    const min = Number(rule.split(':')[1]);
    return (v) =>
      (typeof v === 'string' || typeof v === 'number') && validateMin(v, min);
  }

  // max:N — string: 文字数の最大値, number: 値の最大値
  if (rule.startsWith('max:')) {
    const max = Number(rule.split(':')[1]);
    return (v) =>
      (typeof v === 'string' || typeof v === 'number') && validateMax(v, max);
  }

  // between:N,M — string: 文字数の範囲, number: 値の範囲
  if (rule.startsWith('between:')) {
    const [min, max] = rule.split(':')[1].split(',').map(Number);
    return (v) =>
      (typeof v === 'string' || typeof v === 'number') &&
      validateBetween(v, min, max);
  }

  // digits:N — 固定N桁の数字文字列
  if (rule.startsWith('digits:')) {
    const digits = Number(rule.split(':')[1]);
    return (v) => typeof v === 'string' && validateDigits(v, digits);
  }

  // in:a,b,c — 許可リストに含まれるか
  if (rule.startsWith('in:')) {
    const allowed = rule.split(':')[1].split(',');
    return (v) => typeof v === 'string' && validateIn(v, allowed);
  }

  // regex:pattern — 正規表現パターンに一致するか
  if (rule.startsWith('regex:')) {
    const pattern = new RegExp(rule.slice(6), 'u');
    return (v) => typeof v === 'string' && validateRegex(v, pattern);
  }

  // arrayMin:N — 配列の最小要素数
  if (rule.startsWith('arrayMin:')) {
    const min = Number(rule.split(':')[1]);
    return (v) => Array.isArray(v) && validateArrayMin(v, min);
  }

  // arrayMax:N — 配列の最大要素数
  if (rule.startsWith('arrayMax:')) {
    const max = Number(rule.split(':')[1]);
    return (v) => Array.isArray(v) && validateArrayMax(v, max);
  }

  // extensions:ext1,ext2 — 拡張子チェック
  if (rule.startsWith('extensions:')) {
    const extensions = rule.split(':')[1].split(',');
    return (v) => typeof v === 'string' && validateExtensions(v, extensions);
  }

  // dateFormat:format — 日付フォーマットチェック
  if (rule.startsWith('dateFormat:')) {
    const format = rule.split(':')[1];
    return (v) => typeof v === 'string' && validateDateFormat(v, format);
  }

  // fileSizeMax:size — 最大ファイルサイズチェック
  if (rule.startsWith('fileSizeMax:')) {
    const max = rule.split(':')[1];
    return (v) => typeof v === 'number' && validateFileSizeMax(v, max);
  }

  // fileSizeMin:size — 最小ファイルサイズチェック
  if (rule.startsWith('fileSizeMin:')) {
    const min = rule.split(':')[1];
    return (v) => typeof v === 'number' && validateFileSizeMin(v, min);
  }

  // base64SizeMax:size — base64画像の最大ファイルサイズチェック
  if (rule.startsWith('base64SizeMax:')) {
    const max = rule.split(':')[1];
    return (v) => typeof v === 'string' && validateBase64SizeMax(v, max);
  }

  // mimeType:type1,type2 — MIMEタイプチェック
  if (rule.startsWith('mimeType:')) {
    const allowed = rule.split(':')[1].split(',');
    return (v) => validateMimeType(v, allowed);
  }

  // パラメータなしのルールはマップから取得
  return validators[rule];
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
 *     nickname: ['required', 'string', 'between:1,20']
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
      return resolveValidator(rule)(data[key]);
    });
  });

  return isValid
    ? { success: true, data: data as T }
    : { success: false, error: { errorCode: 400 } };
};
