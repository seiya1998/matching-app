import { FastifyRequest } from 'fastify';
import { extractParamsForGetUserProfile } from './extractParamsForGetUserProfile';
import { GetUserProfileRequest } from './schema';

describe('extractParamsForGetUserProfile', () => {
  // ユーザーのCUID
  const userCuid = 'clygt3jzi0009f2p0nrusvcc1';

  // CUID形式でない文字列
  const invalidCuid = '11';

  test('正常系', () => {
    const request = {
      params: { userId: userCuid }
    } as FastifyRequest<GetUserProfileRequest>;

    const result = extractParamsForGetUserProfile(request);
    expect(result).toEqual({
      success: true,
      data: { userId: userCuid }
    });
  });

  test('異常系 - CUID形式でない文字列', () => {
    const request = {
      params: { userId: invalidCuid }
    } as FastifyRequest<GetUserProfileRequest>;

    const result = extractParamsForGetUserProfile(request);
    expect(result).toEqual({
      success: false,
      error: { errorCode: 400 }
    });
  });
});
