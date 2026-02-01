import { calculateAge } from './calculateAge';

// テスト実行時の日付を固定（2026-02-01）
beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 0, 1));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('calculateAge', () => {
  test('誕生日が過ぎている場合の年齢', () => {
    expect(calculateAge(2000, 1, 1)).toBe(26);
  });

  test('誕生日がまだ来ていない場合は1歳少ない', () => {
    expect(calculateAge(2000, 6, 15)).toBe(25);
  });

  test('当日が誕生日の場合', () => {
    expect(calculateAge(2000, 1, 1)).toBe(26);
  });

  test('18歳の場合', () => {
    expect(calculateAge(2008, 1, 1)).toBe(18);
  });

  test('0歳の場合', () => {
    expect(calculateAge(2026, 1, 1)).toBe(0);
  });
});
