import { PrismaClient } from '@prisma/client';
import createPrismaMock from 'prisma-mock';
import { getCurrentUserFromDB } from './getCurrentUserFromDB';

describe('getCurrentUserFromDB', () => {
  let prismaMock: PrismaClient;

  beforeEach(async () => {
    jest.clearAllMocks();
    prismaMock = createPrismaMock();

    // ハードコードされたユーザーIDに対応するデータを作成
    await prismaMock.rUsers.create({
      data: {
        id: 'cml2sfun60001mjtz4wfl5qra',
        gender: 'MALE',
        currentMembershipStatus: 'FREE',
        currentLoginStatus: 'LOGGED_IN',
        currentVerificationStatus: 'UNVERIFIED',
        birthYear: 2000,
        birthMonth: 1,
        birthDay: 1
      }
    });
    await prismaMock.rUserProfiles.create({
      data: {
        userId: 'cml2sfun60001mjtz4wfl5qra',
        nickname: 'テストユーザー'
      }
    });
  });

  test('正常系 - ユーザー自身の情報を返す', async () => {
    const result = await getCurrentUserFromDB({ prisma: prismaMock });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveProperty('id', 'cml2sfun60001mjtz4wfl5qra');
      expect(result.data).toHaveProperty('nickname', 'テストユーザー');
      expect(result.data).toHaveProperty('gender', 'MALE');
      expect(result.data).toHaveProperty('currentMembershipStatus', 'FREE');
      expect(result.data).toHaveProperty('currentLoginStatus', 'LOGGED_IN');
    }
  });

  test('異常系 - DBエラー時にエラーコード630を返す', async () => {
    jest
      .spyOn(prismaMock.rUserProfiles, 'findUniqueOrThrow')
      .mockRejectedValue(new Error('DB is down'));

    const result = await getCurrentUserFromDB({ prisma: prismaMock });

    expect(result).toEqual({ success: false, error: { errorCode: 630 } });
  });
});
