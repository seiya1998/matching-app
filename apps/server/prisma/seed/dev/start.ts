/* eslint-disable functional/no-expression-statements */
import { PrismaClient } from '@prisma/client';
import { seedCommonTestData } from '../seed';

const testPrisma = new PrismaClient();
seedCommonTestData(testPrisma)
  .then(async () => {
    await testPrisma.$disconnect();
    console.log('seed完了');
  })
  .catch(async (e) => {
    console.error(e);
    await testPrisma.$disconnect();
    process.exit(1);
  });
