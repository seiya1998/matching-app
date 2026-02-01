import { Prisma, Language } from '@prisma/client';

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
          language: Language.JAPANESE,
          userLanguageUpdate: {
            create: {}
          }
        }
      })
    )
  );
};
