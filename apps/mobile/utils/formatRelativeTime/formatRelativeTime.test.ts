import { formatRelativeTime, formatRelativeTimeMemoized } from './formatRelativeTime';

describe('formatRelativeTime', () => {
  describe('基本的な時間の表示', () => {
    test('30秒未満は「たった今」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-18T11:59:40'); // 20秒前
      expect(formatRelativeTime(date, now)).toBe('たった今');
    });

    test('30秒以上1分未満は「秒前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-18T11:59:15'); // 45秒前
      expect(formatRelativeTime(date, now)).toBe('45秒前');
    });

    test('1分以上は「分前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-18T11:55:00'); // 5分前
      expect(formatRelativeTime(date, now)).toBe('5分前');
    });

    test('1時間以上は「時間前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-18T09:00:00'); // 3時間前
      expect(formatRelativeTime(date, now)).toBe('3時間前');
    });

    test('1日以上6日以下は「日前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-16T12:00:00'); // 2日前
      expect(formatRelativeTime(date, now)).toBe('2日前');
    });

    test('7日以上は日付（MM/DD）形式で表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-10T12:00:00'); // 8日前
      expect(formatRelativeTime(date, now)).toBe('10/10');
    });

    test('1ヶ月以上は「ヶ月前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-08-18T12:00:00'); // 2ヶ月前
      expect(formatRelativeTime(date, now)).toBe('2ヶ月前');
    });

    test('1年以上は「年前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2022-10-18T12:00:00'); // 2年前
      expect(formatRelativeTime(date, now)).toBe('2年前');
    });
  });

  describe('エッジケース', () => {
    test('未来の日付は「未来」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-19T12:00:00'); // 1日後
      expect(formatRelativeTime(date, now)).toBe('未来');
    });

    test('文字列の日付でも処理できる', () => {
      const now = new Date('2024-10-18T12:00:00');
      const dateStr = '2024-10-18T11:55:00';
      expect(formatRelativeTime(dateStr, now)).toBe('5分前');
    });

    test('baseDate未指定の場合は現在時刻が使用される', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000); // 5分前
      const result = formatRelativeTime(date);
      expect(result).toBe('5分前');
    });
  });

  describe('境界値テスト', () => {
    test('ちょうど1分前は「1分前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-18T11:59:00');
      expect(formatRelativeTime(date, now)).toBe('1分前');
    });

    test('ちょうど1時間前は「1時間前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-18T11:00:00');
      expect(formatRelativeTime(date, now)).toBe('1時間前');
    });

    test('ちょうど1日前は「1日前」と表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-17T12:00:00');
      expect(formatRelativeTime(date, now)).toBe('1日前');
    });

    test('ちょうど7日前は日付形式で表示される', () => {
      const now = new Date('2024-10-18T12:00:00');
      const date = new Date('2024-10-11T12:00:00');
      expect(formatRelativeTime(date, now)).toBe('10/11');
    });
  });
});

describe('formatRelativeTimeMemoized', () => {
  test('同じ引数での呼び出しはキャッシュされる', () => {
    const now = new Date('2024-10-18T12:00:00');
    const date = new Date('2024-10-18T11:55:00');

    const result1 = formatRelativeTimeMemoized(date, now);
    const result2 = formatRelativeTimeMemoized(date, now);

    expect(result1).toBe('5分前');
    expect(result2).toBe('5分前');
    expect(result1).toBe(result2);
  });

  test('異なる引数での呼び出しは別々に計算される', () => {
    const now = new Date('2024-10-18T12:00:00');
    const date1 = new Date('2024-10-18T11:55:00');
    const date2 = new Date('2024-10-18T11:50:00');

    const result1 = formatRelativeTimeMemoized(date1, now);
    const result2 = formatRelativeTimeMemoized(date2, now);

    expect(result1).toBe('5分前');
    expect(result2).toBe('10分前');
  });
});
