import { PrismaClient } from '@prisma/client';
import createPrismaMock from 'prisma-mock';
import { seedCommonTestData } from '../../../../../../../prisma/seed';
import { findUserProfileById } from './findUserProfileById';

describe('findUserProfileById', () => {
  let prismaMock: PrismaClient;

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaMock = createPrismaMock();
    await seedCommonTestData(prismaMock);
  });

  test('正常系 - 特定のユーザーIDに対してユーザープロフィールを返す', async () => {
    const user = await prismaMock.rUsers.findFirst({
      select: { id: true },
      where: { currentMembershipStatus: 'FREE' }
    });
    const result = await findUserProfileById({
      userId: user?.id ?? '',
      prisma: prismaMock
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveProperty('id', user?.id ?? '');
    }
  });

  test('異常系 - 存在しないユーザーIDに対してエラーを返す', async () => {
    const result = await findUserProfileById({
      userId: 'non-existent-user-id',
      prisma: prismaMock
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errorCode).toBe(600);
    }
  });

  test('異常系 - 既に退会済みの場合はエラーを返す', async () => {
    const canceledUser = await prismaMock.rUsers.findFirst({
      where: { currentMembershipStatus: 'CANCELED' },
      select: { id: true }
    });

    const result = await findUserProfileById({
      userId: canceledUser?.id ?? '',
      prisma: prismaMock
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errorCode).toBe(610);
    }
  });

  test('異常系 - ユーザー取得時のDBエラー', async () => {
    const user = await prismaMock.rUsers.findFirst({
      select: { id: true },
      where: { currentMembershipStatus: 'FREE' }
    });

    jest
      .spyOn(prismaMock.rUserProfiles, 'findUnique')
      .mockRejectedValue(new Error('DB is down'));

    const result = await findUserProfileById({
      userId: user?.id ?? '',
      prisma: prismaMock
    });

    expect(result).toEqual({ success: false, error: { errorCode: 630 } });
  });
});
