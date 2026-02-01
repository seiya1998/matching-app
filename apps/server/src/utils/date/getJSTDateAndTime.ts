/**
 * 指定した日時をJSTに変換しyyyymmd,hhmmss形式で取得
 * (注意)hhmmssの先頭が0の場合は省略され5桁となる
 * ISO形式の文字列も取得できるようにする
 */
export const getJSTDateAndTime = (date: Date | string) => {
  // 文字列の場合はDateオブジェクトに変換
  const dateObj = date instanceof Date ? date : new Date(date);

  // JSTのオフセット
  const jstOffset = 9 * 60 * 60 * 1000;

  // ローカルのオフセット
  // getTimezoneOffsetが存在しない場合は0とする（テスト環境対応）
  const localOffset = (() => {
    try {
      return dateObj.getTimezoneOffset() * 60 * 1000;
    } catch (e) {
      // eslint-disable-next-line functional/no-expression-statements
      console.warn('getTimezoneOffset is not available, using 0 as offset');
      return 0;
    }
  })();

  // JSTに変換
  const jstNow = new Date(dateObj.getTime() + localOffset + jstOffset);

  // yyyyMMdd形式の数値を取得
  const year = String(jstNow.getFullYear());
  const month = String(jstNow.getMonth() + 1).padStart(2, '0');
  const day = String(jstNow.getDate()).padStart(2, '0');
  const yyyymmdd = Number(`${year}${month}${day}`);

  // HHmmss形式の数値を取得
  const hours = String(jstNow.getHours()).padStart(2, '0');
  const minutes = String(jstNow.getMinutes()).padStart(2, '0');
  const seconds = String(jstNow.getSeconds()).padStart(2, '0');
  const hhmmss = Number(`${hours}${minutes}${seconds}`);

  // ISO形式の文字列（JST）
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+09:00`;

  return { yyyymmdd, hhmmss, isoString };
};
