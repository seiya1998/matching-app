/* eslint-disable functional/no-expression-statements */
import { PrismaClient } from '@prisma/client';
import { createUsers } from './createUser';
import { createUserIntroductions } from './createUserIntroduction';
import { createUserLanguages } from './createUserLanguage';
import { createUserPersonalityTypes } from './createUserPersonalityType';
import { createUserProfiles } from './createUserProfile';

export const seedCommonTestData = async (testPrisma: PrismaClient) => {
  try {
    await testPrisma.$transaction(async (prisma) => {
      const users = await createUsers(prisma);
      await createUserProfiles(prisma, users);
      await createUserIntroductions(prisma, users);
      await createUserPersonalityTypes(prisma, users);
      await createUserLanguages(prisma, users);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
