/* eslint-disable functional/no-expression-statements */
import { createUsers } from './createUser';
import { createUserIntroductions } from './createUserIntroduction';
import { createUserPersonalityTypes } from './createUserPersonalityType';
import { createUserProfiles } from './createUserProfile';
import { prisma } from '@/lib';
import { PrismaClient } from 'prisma/generated/prisma/client';

export const seedCommonTestData = async (testPrisma: PrismaClient) => {
  try {
    await testPrisma.$transaction(async (prisma) => {
      const users = await createUsers(prisma);
      await createUserProfiles(prisma, users);
      await createUserIntroductions(prisma, users);
      await createUserPersonalityTypes(prisma, users);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

seedCommonTestData(prisma)
  .then(async () => {
    await prisma.$disconnect();
    console.log('seed完了');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
