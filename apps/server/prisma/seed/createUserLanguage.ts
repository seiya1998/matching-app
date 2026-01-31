import { fakerJA } from '@faker-js/faker';
import { Prisma, Language } from 'prisma/generated/prisma/client';

const faker = fakerJA;

export const createUserLanguages = async (
  prisma: Prisma.TransactionClient,
  users: { id: string; gender: string }[]
) => {
  /* eslint-disable-next-line functional/no-expression-statements */
  await Promise.all(
    users.map((user) =>
      prisma.rUserLanguages.create({
        data: {
          userId: user.id,
          language: faker.helpers.enumValue(Language),
          userLanguageUpdate: {
            create: {}
          }
        }
      })
    )
  );
};
