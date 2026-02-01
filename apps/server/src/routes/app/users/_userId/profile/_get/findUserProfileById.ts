import { MembershipStatus } from '@prisma/client';
import type { GetUserProfileResponse } from './schema';
import type { Prisma } from '@/lib';
import type { Result } from '@/types';
import { calculateAge } from '@/utils';

/**
 * ユーザーIDからユーザープロフィールを取得する
 */
export const findUserProfileById = async ({
  userId,
  prisma
}: {
  userId: string;
  prisma: Prisma;
}): Promise<
  Result<GetUserProfileResponse[200], { errorCode: 600 | 610 | 630 }>
> => {
  try {
    const userProfile = await prisma.rUserProfiles.findUnique({
      relationLoadStrategy: 'join',
      where: { userId },
      include: {
        user: {
          select: {
            birthYear: true,
            birthMonth: true,
            birthDay: true,
            currentMembershipStatus: true,
            currentLoginStatus: true,
            currentVerificationStatus: true,
            introduction: {
              select: {
                content: true
              }
            },
            languages: {
              select: {
                language: true
              }
            },
            personalityTypes: {
              select: {
                personalityType: true
              }
            }
          }
        }
      }
    });

    // ユーザープロフィールが存在しない場合
    if (userProfile === null)
      return { success: false, error: { errorCode: 600 } };

    // すでに退会済みの場合
    if (userProfile.user.currentMembershipStatus === MembershipStatus.CANCELED)
      return { success: false, error: { errorCode: 610 } };

    // 年齢計算（後ほどキャッシュさせる予定）
    const age = calculateAge(
      userProfile.user.birthYear,
      userProfile.user.birthMonth,
      userProfile.user.birthDay
    );

    return {
      success: true,
      data: {
        id: userProfile.userId,
        nickname: userProfile.nickname,
        age,
        currentLoginStatus: userProfile.user.currentLoginStatus,
        introduction: userProfile.user.introduction?.content ?? '',
        receivedLikes: 100,
        bloodType: userProfile.bloodType,
        height: userProfile.height,
        bodyType: userProfile.bodyType,
        residencePrefecture: userProfile.residencePrefecture,
        residenceCity: userProfile.residenceCity,
        birthplace: userProfile.birthplace,
        workplacePrefecture: userProfile.workplacePrefecture,
        workplaceCity: userProfile.workplaceCity,
        siblingPosition: userProfile.siblingPosition,
        educationLevel: userProfile.educationLevel,
        schoolName: userProfile.schoolName,
        annualIncomeRange: userProfile.annualIncomeRange,
        occupation: userProfile.occupation,
        occupationName: userProfile.occupationName,
        holiday: userProfile.holiday,
        drinkingHabit: userProfile.drinkingHabit,
        smokingHabit: userProfile.smokingHabit,
        livingSituation: userProfile.livingSituation,
        maritalHistory: userProfile.maritalHistory,
        hasChildren: userProfile.hasChildren,
        marriageIntention: userProfile.marriageIntention,
        wantsChildren: userProfile.wantsChildren,
        houseworkChildcare: userProfile.houseworkChildcare,
        meetingPreference: userProfile.meetingPreference,
        dateExpense: userProfile.dateExpense,
        sociability: userProfile.sociability,
        languages: userProfile.user.languages.map((l) => l.language),
        personalityTypes: userProfile.user.personalityTypes.map(
          (p) => p.personalityType
        )
      }
    };
  } catch (error) {
    /* eslint-disable-next-line functional/no-expression-statements */
    console.log(error);

    return { success: false, error: { errorCode: 630 } };
  }
};
