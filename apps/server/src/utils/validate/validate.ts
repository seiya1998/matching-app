// cuidのバリデーション
export const validateCuid = (cuid: string): boolean => {
  const cuidPattern = /^c[a-z0-9]{24}$/;
  return cuidPattern.test(cuid);
};

// メールアドレスのバリデーション
export const validateEmail = (email: string): boolean => {
  // 前半: 英数字、ドット、アンダースコア、パーセント、プラス、ハイフンを許可
  // ドメイン部: 英数字とハイフンを含むラベル（ハイフンで始まったり終わったりしない）をドットで区切る
  const emailPattern =
    /^[a-z0-9._%+-]+@[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i;
  return emailPattern.test(email);
};

// 半角英数字、ハイフンのバリデーション
export const validateAlphaNumHyphen = (input: string): boolean => {
  const alphaNumHyphenPattern = /^[a-z0-9-]+$/i;
  return alphaNumHyphenPattern.test(input);
};

// 半角英数字のバリデーション
export const validateAlphanumeric = (input: string): boolean => {
  const alphanumericPattern = /^[a-zA-Z0-9]+$/;
  return alphanumericPattern.test(input);
};

// base64形式のバリデーション
export const validateBase64 = (input: string): boolean => {
  const base64ImagePattern = /^data:image\/(png|jpeg|jpg|heif|heic);base64,/;
  const base64DataPattern = /^[A-Za-z0-9+/=]+$/;

  // 拡張子がpng, jpeg, jpg, heif, heicのいずれかで始まっているかチェック
  if (!base64ImagePattern.test(input)) return false;

  // base64データ部分を取り出して、base64のパターンに一致するか確認
  const base64Data = input.split('base64,')[1];

  // base64Dataがない場合はエラー
  if (base64Data == null) return false;

  return base64DataPattern.test(base64Data);
};

// 固定桁数の数字文字列のバリデーション
export const validateDigits = (input: string, digits: number): boolean => {
  const digitsPattern = /^\d+$/;
  return digitsPattern.test(input) && input.length === digits;
};

// ページネーションのバリデーション
export const validatePaginationParams = (
  limit: number,
  offset: number,
  maxLimit: number = 8
): boolean => {
  return limit >= 1 && limit <= maxLimit && offset >= 0;
};
