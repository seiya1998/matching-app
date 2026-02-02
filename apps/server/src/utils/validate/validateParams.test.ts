import { validateParams } from './validateParams';

describe('validateParams', () => {
  // --- required ---
  describe('required', () => {
    const validate = (value: unknown) =>
      validateParams<{ field: unknown }>(
        { field: value },
        { field: ['required'] }
      );

    test('値がある場合はsuccess', () => {
      expect(validate('hello')).toEqual({
        success: true,
        data: { field: 'hello' }
      });
    });

    test('nullの場合はfailure', () => {
      expect(validate(null)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('undefinedの場合はfailure', () => {
      expect(validate(undefined)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('空文字の場合はfailure', () => {
      expect(validate('')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- cuid ---
  describe('cuid', () => {
    const validate = (value: unknown) =>
      validateParams<{ id: unknown }>({ id: value }, { id: ['cuid'] });

    test('有効なCUIDの場合はsuccess', () => {
      expect(validate('cabcdefghijklmnopqrstuvwx')).toEqual({
        success: true,
        data: { id: 'cabcdefghijklmnopqrstuvwx' }
      });
    });

    test('無効な文字列の場合はfailure', () => {
      expect(validate('invalid-cuid')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('数値の場合はfailure', () => {
      expect(validate(123)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- string ---
  describe('string', () => {
    const validate = (value: unknown) =>
      validateParams<{ field: unknown }>(
        { field: value },
        { field: ['string'] }
      );

    test('文字列の場合はsuccess', () => {
      expect(validate('hello')).toEqual({
        success: true,
        data: { field: 'hello' }
      });
    });

    test('数値の場合はfailure', () => {
      expect(validate(123)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- number ---
  describe('number', () => {
    const validate = (value: unknown) =>
      validateParams<{ field: unknown }>(
        { field: value },
        { field: ['number'] }
      );

    test('数値の場合はsuccess', () => {
      expect(validate(42)).toEqual({ success: true, data: { field: 42 } });
    });

    test('NaNの場合はfailure', () => {
      expect(validate(NaN)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('文字列の場合はfailure', () => {
      expect(validate('123')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- min ---
  describe('min', () => {
    test('文字列の文字数が最小値以上の場合はsuccess', () => {
      const result = validateParams<{ name: unknown }>(
        { name: 'ab' },
        { name: ['string', 'min:2'] }
      );
      expect(result).toEqual({ success: true, data: { name: 'ab' } });
    });

    test('文字列の文字数が最小値未満の場合はfailure', () => {
      const result = validateParams<{ name: unknown }>(
        { name: 'a' },
        { name: ['string', 'min:2'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });

    test('数値が最小値以上の場合はsuccess', () => {
      const result = validateParams<{ age: unknown }>(
        { age: 0 },
        { age: ['number', 'min:0'] }
      );
      expect(result).toEqual({ success: true, data: { age: 0 } });
    });

    test('数値が最小値未満の場合はfailure', () => {
      const result = validateParams<{ age: unknown }>(
        { age: -1 },
        { age: ['number', 'min:0'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });
  });

  // --- max ---
  describe('max', () => {
    test('文字列の文字数が最大値以下の場合はsuccess', () => {
      const result = validateParams<{ name: unknown }>(
        { name: 'hello' },
        { name: ['string', 'max:5'] }
      );
      expect(result).toEqual({ success: true, data: { name: 'hello' } });
    });

    test('文字列の文字数が最大値超過の場合はfailure', () => {
      const result = validateParams<{ name: unknown }>(
        { name: 'hello!' },
        { name: ['string', 'max:5'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });

    test('数値が最大値以下の場合はsuccess', () => {
      const result = validateParams<{ age: unknown }>(
        { age: 100 },
        { age: ['number', 'max:100'] }
      );
      expect(result).toEqual({ success: true, data: { age: 100 } });
    });

    test('数値が最大値超過の場合はfailure', () => {
      const result = validateParams<{ age: unknown }>(
        { age: 101 },
        { age: ['number', 'max:100'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });
  });

  // --- digits ---
  describe('digits', () => {
    const validate = (value: unknown) =>
      validateParams<{ code: unknown }>(
        { code: value },
        { code: ['digits:4'] }
      );

    test('正しい桁数の数字文字列の場合はsuccess', () => {
      expect(validate('1234')).toEqual({
        success: true,
        data: { code: '1234' }
      });
    });

    test('桁数不一致の場合はfailure', () => {
      expect(validate('123')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('数字以外を含む場合はfailure', () => {
      expect(validate('12ab')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- alphanumeric ---
  describe('alphanumeric', () => {
    const validate = (value: unknown) =>
      validateParams<{ field: unknown }>(
        { field: value },
        { field: ['alphanumeric'] }
      );

    test('半角英数字の場合はsuccess', () => {
      expect(validate('abc123')).toEqual({
        success: true,
        data: { field: 'abc123' }
      });
    });

    test('記号を含む場合はfailure', () => {
      expect(validate('abc-123')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- base64 ---
  describe('base64', () => {
    const validate = (value: unknown) =>
      validateParams<{ image: unknown }>(
        { image: value },
        { image: ['base64'] }
      );

    test('有効なbase64画像の場合はsuccess', () => {
      expect(validate('data:image/png;base64,iVBORw0KGgo=')).toEqual({
        success: true,
        data: { image: 'data:image/png;base64,iVBORw0KGgo=' }
      });
    });

    test('プレフィックスがない場合はfailure', () => {
      expect(validate('iVBORw0KGgo=')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- email ---
  describe('email', () => {
    const validate = (value: unknown) =>
      validateParams<{ email: unknown }>(
        { email: value },
        { email: ['email'] }
      );

    test('有効なメールアドレスの場合はsuccess', () => {
      expect(validate('user@example.com')).toEqual({
        success: true,
        data: { email: 'user@example.com' }
      });
    });

    test('無効な形式の場合はfailure', () => {
      expect(validate('invalid-email')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- between ---
  describe('between', () => {
    test('文字列の文字数が範囲内の場合はsuccess', () => {
      const result = validateParams<{ name: unknown }>(
        { name: 'abc' },
        { name: ['string', 'between:1,5'] }
      );
      expect(result).toEqual({ success: true, data: { name: 'abc' } });
    });

    test('文字列の文字数が範囲外の場合はfailure', () => {
      const result = validateParams<{ name: unknown }>(
        { name: 'abcdef' },
        { name: ['string', 'between:1,5'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });

    test('数値が範囲内の場合はsuccess', () => {
      const result = validateParams<{ age: unknown }>(
        { age: 20 },
        { age: ['number', 'between:0,100'] }
      );
      expect(result).toEqual({ success: true, data: { age: 20 } });
    });

    test('数値が範囲外の場合はfailure', () => {
      const result = validateParams<{ age: unknown }>(
        { age: 101 },
        { age: ['number', 'between:0,100'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });
  });

  // --- in ---
  describe('in', () => {
    const validate = (value: unknown) =>
      validateParams<{ type: unknown }>(
        { type: value },
        { type: ['in:app,sync'] }
      );

    test('許可リストに含まれる場合はsuccess', () => {
      expect(validate('app')).toEqual({
        success: true,
        data: { type: 'app' }
      });
    });

    test('許可リストに含まれない場合はfailure', () => {
      expect(validate('other')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('数値の場合はfailure', () => {
      expect(validate(123)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- regex ---
  describe('regex', () => {
    const validate = (value: unknown) =>
      validateParams<{ field: unknown }>(
        { field: value },
        { field: ['regex:^[a-z]+$'] }
      );

    test('パターンに一致する場合はsuccess', () => {
      expect(validate('abc')).toEqual({
        success: true,
        data: { field: 'abc' }
      });
    });

    test('パターンに一致しない場合はfailure', () => {
      expect(validate('ABC')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('数値の場合はfailure', () => {
      expect(validate(123)).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- postalNo ---
  describe('postalNo', () => {
    const validate = (value: unknown) =>
      validateParams<{ postal: unknown }>(
        { postal: value },
        { postal: ['postalNo'] }
      );

    test('7桁数字の場合はsuccess', () => {
      expect(validate('1234567')).toEqual({
        success: true,
        data: { postal: '1234567' }
      });
    });

    test('桁数不足の場合はfailure', () => {
      expect(validate('123456')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('ハイフン付きの場合はfailure', () => {
      expect(validate('123-4567')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- mobilePhone ---
  describe('mobilePhone', () => {
    const validate = (value: unknown) =>
      validateParams<{ phone: unknown }>(
        { phone: value },
        { phone: ['mobilePhone'] }
      );

    test('有効な携帯電話番号の場合はsuccess', () => {
      expect(validate('09012345678')).toEqual({
        success: true,
        data: { phone: '09012345678' }
      });
    });

    test('桁数不足の場合はfailure', () => {
      expect(validate('0901234567')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('0以外で始まる場合はfailure', () => {
      expect(validate('19012345678')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- landlinePhone ---
  describe('landlinePhone', () => {
    const validate = (value: unknown) =>
      validateParams<{ phone: unknown }>(
        { phone: value },
        { phone: ['landlinePhone'] }
      );

    test('有効な固定電話番号の場合はsuccess', () => {
      expect(validate('0312345678')).toEqual({
        success: true,
        data: { phone: '0312345678' }
      });
    });

    test('桁数超過の場合はfailure', () => {
      expect(validate('03123456789')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- url ---
  describe('url', () => {
    const validate = (value: unknown) =>
      validateParams<{ link: unknown }>({ link: value }, { link: ['url'] });

    test('有効なURLの場合はsuccess', () => {
      expect(validate('https://example.com')).toEqual({
        success: true,
        data: { link: 'https://example.com' }
      });
    });

    test('httpも有効', () => {
      expect(validate('http://example.com')).toEqual({
        success: true,
        data: { link: 'http://example.com' }
      });
    });

    test('プロトコルなしの場合はfailure', () => {
      expect(validate('example.com')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- password ---
  describe('password', () => {
    const validate = (value: unknown) =>
      validateParams<{ pw: unknown }>({ pw: value }, { pw: ['password'] });

    test('有効なパスワードの場合はsuccess', () => {
      expect(validate('Abcdef1!')).toEqual({
        success: true,
        data: { pw: 'Abcdef1!' }
      });
    });

    test('大文字がない場合はfailure', () => {
      expect(validate('abcdef1!')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });

    test('8文字未満の場合はfailure', () => {
      expect(validate('Abc1!')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- alphaNumHyphen ---
  describe('alphaNumHyphen', () => {
    const validate = (value: unknown) =>
      validateParams<{ field: unknown }>(
        { field: value },
        { field: ['alphaNumHyphen'] }
      );

    test('半角英数字・ハイフンの場合はsuccess', () => {
      expect(validate('abc-123')).toEqual({
        success: true,
        data: { field: 'abc-123' }
      });
    });

    test('アンダースコアを含む場合はfailure', () => {
      expect(validate('abc_123')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- array ---
  describe('array', () => {
    const validate = (value: unknown) =>
      validateParams<{ items: unknown }>(
        { items: value },
        { items: ['array'] }
      );

    test('配列の場合はsuccess', () => {
      expect(validate([1, 2, 3])).toEqual({
        success: true,
        data: { items: [1, 2, 3] }
      });
    });

    test('空配列の場合はsuccess', () => {
      expect(validate([])).toEqual({
        success: true,
        data: { items: [] }
      });
    });

    test('配列でない場合はfailure', () => {
      expect(validate('not-array')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- arrayMax ---
  describe('arrayMax', () => {
    test('要素数が最大値以下の場合はsuccess', () => {
      const result = validateParams<{ items: unknown }>(
        { items: ['a', 'b'] },
        { items: ['array', 'arrayMax:3'] }
      );
      expect(result).toEqual({
        success: true,
        data: { items: ['a', 'b'] }
      });
    });

    test('要素数が最大値超過の場合はfailure', () => {
      const result = validateParams<{ items: unknown }>(
        { items: ['a', 'b', 'c', 'd'] },
        { items: ['array', 'arrayMax:3'] }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });
  });

  // --- nullable ---
  describe('nullable', () => {
    const validate = (value: unknown) =>
      validateParams<{ photoId: unknown }>(
        { photoId: value },
        { photoId: ['nullable', 'cuid'] }
      );

    test('nullの場合は他のルールをスキップしてsuccess', () => {
      expect(validate(null)).toEqual({
        success: true,
        data: { photoId: null }
      });
    });

    test('undefinedの場合は他のルールをスキップしてsuccess', () => {
      expect(validate(undefined)).toEqual({
        success: true,
        data: { photoId: undefined }
      });
    });

    test('値がある場合は他のルールで検証する（有効）', () => {
      expect(validate('cabcdefghijklmnopqrstuvwx')).toEqual({
        success: true,
        data: { photoId: 'cabcdefghijklmnopqrstuvwx' }
      });
    });

    test('値がある場合は他のルールで検証する（無効）', () => {
      expect(validate('invalid')).toEqual({
        success: false,
        error: { errorCode: 400 }
      });
    });
  });

  // --- 複数フィールド ---
  describe('複数フィールド', () => {
    test('全フィールドが有効な場合はsuccess', () => {
      const result = validateParams<{ userId: unknown; nickname: unknown }>(
        { userId: 'cabcdefghijklmnopqrstuvwx', nickname: 'taro' },
        {
          userId: ['required', 'cuid'],
          nickname: ['required', 'string', 'min:1', 'max:20']
        }
      );
      expect(result).toEqual({
        success: true,
        data: { userId: 'cabcdefghijklmnopqrstuvwx', nickname: 'taro' }
      });
    });

    test('1つでも無効な場合はfailure', () => {
      const result = validateParams<{ userId: unknown; nickname: unknown }>(
        { userId: 'invalid', nickname: 'taro' },
        {
          userId: ['required', 'cuid'],
          nickname: ['required', 'string', 'min:1', 'max:20']
        }
      );
      expect(result).toEqual({ success: false, error: { errorCode: 400 } });
    });
  });
});
