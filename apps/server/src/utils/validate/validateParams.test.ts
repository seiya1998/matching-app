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
