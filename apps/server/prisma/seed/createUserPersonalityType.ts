import { fakerJA } from '@faker-js/faker';
import { Prisma, PersonalityType } from '@prisma/client';

const faker = fakerJA;

export const createUserPersonalityTypes = async (
  prisma: Prisma.TransactionClient,
  users: { id: string; gender: string }[]
) => {
  /* eslint-disable-next-line functional/no-expression-statements */
  await Promise.all(
    users.map((user) =>
      prisma.rUserPersonalityTypes.create({
        data: {
          userId: user.id,
          personalityType: faker.helpers.enumValue(PersonalityType),
          userPersonalityTypeUpdate: {
            create: {}
          }
        }
      })
    )
  );
};
