import { fakerJA } from '@faker-js/faker';
import {
  Prisma,
  MembershipStatus,
  VerificationStatus,
  LoginStatus,
  Gender
} from '@prisma/client';

const faker = fakerJA;

export const createUsers = async (prisma: Prisma.TransactionClient) => {
  const devices = Array.from({ length: 100 }, () => ({
    deviceId: faker.string.uuid(),
    deviceModelId: faker.string.uuid(),
    expoPushToken: faker.string.uuid(),
    user: {
      create: {
        gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]),
        birthYear: faker.number.int({ min: 1988, max: 2004 }),
        birthMonth: faker.number.int({ min: 1, max: 12 }),
        birthDay: faker.number.int({ min: 1, max: 28 }),
        currentMembershipStatus: faker.helpers.enumValue(MembershipStatus),
        currentVerificationStatus: faker.helpers.enumValue(VerificationStatus),
        currentLoginStatus: faker.helpers.enumValue(LoginStatus)
      }
    }
  }));

  /* eslint-disable-next-line functional/no-expression-statements */
  await Promise.all(devices.map((data) => prisma.rDevices.create({ data })));
  return await prisma.rUsers.findMany({ select: { id: true, gender: true } });
};
