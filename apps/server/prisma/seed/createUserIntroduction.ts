import { fakerJA } from '@faker-js/faker';
import { Prisma } from 'prisma/generated/prisma/client';

const faker = fakerJA;

const generateIntroduction = (_?: undefined): string => {
  const greetings = [
    'はじめまして！プロフィールを見ていただきありがとうございます。',
    'プロフィールをご覧いただきありがとうございます！',
    'はじめまして！よろしくお願いします。'
  ];

  const jobs = [
    'IT関係の仕事をしています。',
    '医療関係の仕事をしています。',
    'メーカーで営業をしています。',
    'フリーランスでデザイナーをしています。',
    '金融関係の会社で働いています。'
  ];

  const hobbies = [
    '休日はカフェ巡りや映画鑑賞をしています。',
    '趣味は料理と旅行です。',
    'アウトドアが好きでよくキャンプに行きます。',
    '音楽が好きでライブによく行きます。',
    'ジムに通うのが日課です。'
  ];

  const closings = [
    '気軽にいいねしてください！',
    'まずはメッセージからお話しできたら嬉しいです。',
    '気になった方はお気軽にどうぞ！',
    'よろしくお願いします！'
  ];

  return [
    faker.helpers.arrayElement(greetings),
    faker.helpers.arrayElement(jobs),
    faker.helpers.arrayElement(hobbies),
    faker.helpers.arrayElement(closings)
  ].join('\n');
};

export const createUserIntroductions = async (
  prisma: Prisma.TransactionClient,
  users: { id: string; gender: string }[]
) => {
  /* eslint-disable-next-line functional/no-expression-statements */
  await Promise.all(
    users.map((user) =>
      prisma.rUserIntroductions.create({
        data: {
          userId: user.id,
          content: generateIntroduction(),
          userIntroductionUpdate: {
            create: {}
          }
        }
      })
    )
  );
};
