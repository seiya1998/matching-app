/* eslint-disable functional/no-return-void, functional/no-expression-statements */
import pino from 'pino';
import { getJSTDateAndTime } from '../date';
import { getCurrentRequestId } from './responseLogger';

// Pinoロガーの設定
export const pinoLogger = pino({
  // タイムスタンプを無効化
  timestamp: false,
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: false, // ログレベルの色付けを無効化（CloudWatchでANSIカラーコードが出力されていた）
      levelFirst: true, // レベルを最初に表示
      translateTime: false,
      ignore: 'pid,hostname,time'
    }
  }
});

// GitHub Actions環境でのログ無効化フラグ
const isLoggingDisabled = process.env['CI'] === 'true';

/**
 * エラー情報をフォーマットする共通関数
 * @param error - 例外オブジェクト
 * @returns フォーマット済みのログメッセージ
 */
const formatErrorLog = (error: unknown): string => {
  const errorInfo =
    error instanceof Error
      ? error
      : new Error(typeof error === 'string' ? error : String(error));

  // 改行を配列に分割
  const formattedErrorMessage = errorInfo.message
    .split('\n')
    .filter((line) => line.trim() !== '');

  const formattedErrorStack =
    errorInfo.stack != null
      ? errorInfo.stack.split('\n').filter((line) => line.trim() !== '')
      : undefined;

  // JSTのタイムスタンプを取得
  const jstDateTime = getJSTDateAndTime(new Date());

  // リクエストIDを取得
  const requestId = getCurrentRequestId();
  const requestIdPart = `[requestId:${requestId}] `;

  // ログデータを構築
  const logData = {
    timestamp: jstDateTime.isoString,
    name: errorInfo.name,
    message: formattedErrorMessage,
    stack: formattedErrorStack
  };

  return `[${logData.timestamp}] ${requestIdPart} [${logData.name}] ${JSON.stringify(logData)}`;
};

export const logger = {
  /**
   *  サービス層のエラーログを記録するためのユーティリティ関数
   *  @param error - 例外オブジェクト
   */
  error(error: unknown): void {
    if (isLoggingDisabled) return;
    const logMessage = formatErrorLog(error);
    pinoLogger.error(logMessage);
  },

  /**
   * サービス層のクリティカルエラーログを記録するためのユーティリティ関数
   * システム全体に影響を与える重大なエラーに使用
   * @param error - 例外オブジェクト
   */
  fatal(error: unknown): void {
    if (isLoggingDisabled) return;
    const logMessage = formatErrorLog(error);
    // Pinoのfatalメソッドを使用（criticalの代わり）
    pinoLogger.fatal(logMessage);
  },

  /**
   *  サービス層のデバッグログを記録するためのユーティリティ関数
   *  @param message - ログメッセージ
   */
  debug(message: string): void {
    if (isLoggingDisabled) return;
    // JSTのタイムスタンプを取得
    const jstDateTime = getJSTDateAndTime(new Date());

    // リクエストIDを取得
    const requestId = getCurrentRequestId();
    const requestIdPart = `[requestId:${requestId}] `;

    const logMessage = `[${jstDateTime.isoString}] ${requestIdPart}${message}`;
    pinoLogger.debug(logMessage);
  }
};
