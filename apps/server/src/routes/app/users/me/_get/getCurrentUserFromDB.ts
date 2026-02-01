import type { GetCurrentUserResponse } from './schema';
import type { Prisma } from '@/lib';
import type { Result } from '@/types';
import { logger } from '@/utils';

/**
 * ユーザー自身の情報を取得する
 */
export const getCurrentUserFromDB = async ({
  prisma
}: {
  prisma: Prisma;
}): Promise<Result<GetCurrentUserResponse[200], { errorCode: 630 }>> => {
  try {
    const user = await prisma.rUserProfiles.findUniqueOrThrow({
      where: { userId: 'cml2sfun60001mjtz4wfl5qra' },
      select: {
        userId: true,
        nickname: true,
        user: {
          select: {
            gender: true,
            currentMembershipStatus: true,
            currentLoginStatus: true,
            currentVerificationStatus: true
          }
        }
      }
    });

    return {
      success: true,
      data: {
        id: user.userId,
        nickname: user.nickname,
        remainingLikes: 10,
        age: 25,
        gender: user.user.gender,
        currentMembershipStatus: user.user.currentMembershipStatus,
        currentLoginStatus: user.user.currentLoginStatus,
        mainImageUrl: null
      }
    };
  } catch (error) {
    /* eslint-disable-next-line functional/no-expression-statements */
    logger.error(error);

    return { success: false, error: { errorCode: 630 } };
  }
};
