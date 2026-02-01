/* eslint-disable functional/no-return-void, functional/no-expression-statements, functional/immutable-data, functional/functional-parameters */

import { AsyncLocalStorage } from 'async_hooks';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getJSTDateAndTime } from '../date';
import { pinoLogger } from './logger';

// FastifyRequestに startTime と requestId プロパティを追加する型定義
declare module 'fastify' {
  interface FastifyRequest {
    startTime: bigint | null;
    requestId: string | null;
  }
}

type LogData = {
  timestamp: string;
  endpoint: string;
  method: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestHeaders?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responseBody?: Record<string, any>;
  time: number;
};

// APIレスポンス等のログ出力を除外対象のリスト
const EXCLUDED_LOGGING_URLS = ['/', '/admin/schedule/example'];

// 各リクエストごとにリクエストIDを保持するAsyncLocalStorage
const requestIdStorage = new AsyncLocalStorage<string>();

/**
 * 時刻ベースのリクエストIDを生成
 * フォーマット: YYYYMMDDHHMMSSXXXX （例: 202509101159300001）
 */
const generateRequestId = (): string => {
  const now = new Date();
  const jstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const timestamp = jstTime
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14);
  const randomId = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `${timestamp}${randomId}`;
};

/**
 * 現在のリクエストIDを取得（logger.tsで使用）
 * HTTPリクエスト外（テスト環境など）では新しいIDを生成
 */
export const getCurrentRequestId = (): string => {
  const currentId = requestIdStorage.getStore();
  if (currentId == null) {
    const newId = generateRequestId();
    return newId;
  }
  return currentId;
};

/**
 * レスポンスロギングミドルウェア
 * すべてのリクエストとレスポンスに対して統一されたログを記録する
 */
export function registerResponseLogger(server: FastifyInstance): void {
  // リクエストオブジェクトを拡張
  server.decorateRequest('startTime', null);
  server.decorateRequest('requestId', null);

  // リクエストが開始した時間を記録し、リクエストIDを生成
  server.addHook('onRequest', (request, _, done) => {
    request.startTime = process.hrtime.bigint();
    const id = generateRequestId();
    request.requestId = id;
    // AsyncLocalStorageにリクエストIDを設定（logger用）
    requestIdStorage.enterWith(id);
    done();
  });

  /**
   * レスポンスを送信する前にログを記録
   */
  server.addHook(
    'onSend',
    async (request: FastifyRequest, reply: FastifyReply, payload: unknown) => {
      // 除外対象のURLはログを記録しない
      if (EXCLUDED_LOGGING_URLS.includes(request.url)) {
        return payload;
      }

      const endTime = process.hrtime.bigint();
      const responseTime =
        Number(endTime - (request.startTime as bigint)) / 1000000; // ミリ秒に変換

      // 秒に変換し、小数点以下2桁まで保持
      const responseTimeInSeconds = parseFloat(
        (responseTime / 1000).toFixed(2)
      );

      // レスポンスボディの取得
      const responseBody = payload != undefined ? payload : undefined;

      // ログデータの構築
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sanitizedRequestBody: Record<string, any> | undefined = (() => {
        if (request.body == null) return undefined;
        return request.body;
      })();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sanitizedResponseBody: Record<string, any> | undefined = (() => {
        if (reply.statusCode !== 200) return undefined;
        return responseBody;
      })();

      const logData: LogData = {
        timestamp: getJSTDateAndTime(new Date()).isoString, // ISO形式の文字列（JST）
        endpoint: request.url,
        method: request.method,
        statusCode: reply.statusCode,
        requestHeaders: request.headers,
        requestBody: sanitizedRequestBody,
        responseBody: sanitizedResponseBody,
        time: responseTimeInSeconds // 秒単位で時間を記録
      };

      // リクエストIDを取得
      const requestId = request.requestId;
      const requestIdPart =
        requestId != null ? `[requestId:${requestId}] ` : '';

      // ログメッセージフォーマット
      const logMessage = `[${logData.timestamp}] ${requestIdPart} [${logData.method}] [${logData.endpoint}] ${JSON.stringify(logData)}`;

      // フォーマットしたログを出力
      createLogByStatusCode(reply.statusCode, logMessage);

      return payload;
    }
  );
}

// ステータスコードに基づいてログレベルを決定
const createLogByStatusCode = (statusCode: number, data: string): void => {
  switch (true) {
    case statusCode >= 500:
      return pinoLogger.error(data);
    case statusCode >= 400:
      return pinoLogger.warn(data);
    default:
      return pinoLogger.info(data);
  }
};
