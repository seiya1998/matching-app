/**
 * 相対時間を計算してフォーマットする関数
 * パフォーマンスを考慮した実装
 */

type TimeUnit = {
  name: string;
  seconds: number;
  max?: number;
};

const TIME_UNITS: TimeUnit[] = [
  { name: '年', seconds: 31536000 },
  { name: 'ヶ月', seconds: 2592000 },
  { name: '日', seconds: 86400 },
  { name: '時間', seconds: 3600 },
  { name: '分', seconds: 60 },
];

/**
 * 日付を相対時間表示に変換する
 * @param date - 対象の日付
 * @param baseDate - 基準日時（デフォルトは現在時刻）
 * @returns フォーマットされた相対時間文字列
 */
export function formatRelativeTime(
  date: Date | string,
  baseDate: Date = new Date()
): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((baseDate.getTime() - targetDate.getTime()) / 1000);

  // 未来の日付の場合
  if (diffInSeconds < 0) {
    return '未来';
  }

  // たった今
  if (diffInSeconds < 30) {
    return 'たった今';
  }

  // 適切な単位を見つけて返す
  for (const unit of TIME_UNITS) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1) {
      // 7日以上は日付表示にする
      if (unit.name === '日' && value >= 7) {
        return formatDate(targetDate);
      }
      return `${value}${unit.name}前`;
    }
  }

  // 1分未満
  return `${diffInSeconds}秒前`;
}

/**
 * 日付を MM/DD 形式でフォーマット
 * @param date - 対象の日付
 * @returns フォーマットされた日付文字列
 */
function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
}

/**
 * メモ化された相対時間計算
 * 同じ日付に対して複数回計算しないようにキャッシュする
 */
const cache = new Map<string, { result: string; timestamp: number }>();
const CACHE_DURATION = 60000; // 1分間キャッシュ

export function formatRelativeTimeMemoized(
  date: Date | string,
  baseDate: Date = new Date()
): string {
  const key = `${date.toString()}_${baseDate.getTime()}`;
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.result;
  }

  const result = formatRelativeTime(date, baseDate);
  cache.set(key, { result, timestamp: Date.now() });

  // キャッシュサイズを制限（最大100件）
  if (cache.size > 100) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }

  return result;
}