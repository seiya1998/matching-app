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

// 電話番号のバリデーション
export const validatePhoneNumber = (
  phoneType: 'mobile' | 'landline',
  phoneNumber: string
): boolean => {
  // 携帯電話は11桁（0から始まる）
  const mobilePattern = /^0\d{10}$/;
  // 固定電話は10桁（0から始まる）
  const landlinePattern = /^0\d{9}$/;

  return phoneType === 'mobile'
    ? mobilePattern.test(phoneNumber)
    : landlinePattern.test(phoneNumber);
};

// urlのバリデーション
export const validateUrl = (url: string): boolean => {
  const urlPattern = /^https?:\/\/[^\s]+$/;
  return urlPattern.test(url);
};

// パスワード形式のバリデーション（大文字・小文字・数字・記号を各1つ以上含む8文字以上）
export const validatePassword = (password: string): boolean => {
  const passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!-/:-@[-`{-~])[!-~]{8,}$/;
  return passwordPattern.test(password);
};

// 最小値バリデーション（string: 文字数, number: 値）
export const validateMin = (value: string | number, min: number): boolean => {
  return typeof value === 'string' ? value.length >= min : value >= min;
};

// 最大値バリデーション（string: 文字数, number: 値）
export const validateMax = (value: string | number, max: number): boolean => {
  return typeof value === 'string' ? value.length <= max : value <= max;
};

// 範囲バリデーション（string: 文字数, number: 値）
export const validateBetween = (
  value: string | number,
  min: number,
  max: number
): boolean => {
  return typeof value === 'string'
    ? value.length >= min && value.length <= max
    : value >= min && value <= max;
};

// 許可リストバリデーション
export const validateIn = (
  value: string,
  allowed: readonly string[]
): boolean => {
  return allowed.includes(value);
};

// 正規表現バリデーション
export const validateRegex = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

// 配列の最大要素数バリデーション
export const validateArrayMax = (value: unknown[], max: number): boolean => {
  return value.length <= max;
};

// 郵便番号のバリデーション
export const validatePostalNo = (postalCode: string) => {
  const regex = /^\d{7}$/;
  return regex.test(postalCode);
};
