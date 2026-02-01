import { getJSTDateAndTime } from './getJSTDateAndTime';

describe('getJSTDateAndTime', () => {
  test('正常系 - UTC -> JST 基本変換', () => {
    const date = new Date('2024-11-29T06:51:59.756Z');
    const result = getJSTDateAndTime(date);

    expect(result).toEqual({
      yyyymmdd: 20241129,
      hhmmss: 155159,
      isoString: '2024-11-29T15:51:59+09:00'
    });
  });

  test('正常系 - UTC -> JST 日付のみ', () => {
    const date = new Date('2024-11-29');
    const result = getJSTDateAndTime(date);

    expect(result).toEqual({
      yyyymmdd: 20241129,
      hhmmss: 90000,
      isoString: '2024-11-29T09:00:00+09:00'
    });
  });

  test('正常系 - 日付をまたぐ場合', () => {
    const date = new Date('2024-11-30T15:00:00Z'); // UTCで30日の午後3時
    const result = getJSTDateAndTime(date);

    expect(result).toEqual({
      yyyymmdd: 20241201,
      hhmmss: 0,
      isoString: '2024-12-01T00:00:00+09:00'
    });
  });

  test('正常系 - 閏年対応 2月29日', () => {
    const date = new Date('2024-02-29T23:59:59Z');
    const result = getJSTDateAndTime(date);

    expect(result).toEqual({
      yyyymmdd: 20240301,
      hhmmss: 85959,
      isoString: '2024-03-01T08:59:59+09:00'
    });
  });

  test('正常系 - UTC境界テスト', () => {
    const date = new Date('2024-11-29T23:00:00Z');
    const result = getJSTDateAndTime(date);

    expect(result).toEqual({
      yyyymmdd: 20241130,
      hhmmss: 80000,
      isoString: '2024-11-30T08:00:00+09:00'
    });
  });

  test('文字列入力テスト - ISO形式', () => {
    const dateString = '2024-12-25T00:00:00Z';
    const result = getJSTDateAndTime(dateString);

    expect(result).toEqual({
      yyyymmdd: 20241225,
      hhmmss: 90000,
      isoString: '2024-12-25T09:00:00+09:00'
    });
  });
});
