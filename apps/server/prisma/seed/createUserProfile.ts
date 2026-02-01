import { fakerJA } from '@faker-js/faker';
import {
  Prisma,
  BloodType,
  BodyType,
  SiblingPosition,
  EducationLevel,
  AnnualIncomeRange,
  Holiday,
  Occupation,
  DrinkingHabit,
  SmokingHabit,
  LivingSituation,
  MaritalHistory,
  HasChildren,
  MarriageIntention,
  WantsChildren,
  HouseworkChildcare,
  MeetingPreference,
  DateExpense,
  Sociability
} from '@prisma/client';

const faker = fakerJA;

export const createUserProfiles = async (
  prisma: Prisma.TransactionClient,
  users: { id: string; gender: string }[]
) => {
  /* eslint-disable-next-line functional/no-expression-statements */
  await Promise.all(
    users.map((user) =>
      prisma.rUserProfiles.create({
        data: {
          userId: user.id,
          nickname:
            user.gender === 'MALE'
              ? faker.person.firstName('male')
              : faker.person.firstName('female'),
          bloodType: faker.helpers.enumValue(BloodType),
          height: faker.number.int({ min: 140, max: 185 }),
          bodyType: faker.helpers.enumValue(BodyType),
          residencePrefecture: faker.location.state(),
          residenceCity: faker.location.city(),
          birthplace: faker.location.state(),
          workplacePrefecture: faker.location.state(),
          workplaceCity: faker.location.city(),
          siblingPosition: faker.helpers.enumValue(SiblingPosition),
          educationLevel: faker.helpers.enumValue(EducationLevel),
          annualIncomeRange: faker.helpers.enumValue(AnnualIncomeRange),
          holiday: faker.helpers.enumValue(Holiday),
          occupation: faker.helpers.enumValue(Occupation),
          drinkingHabit: faker.helpers.enumValue(DrinkingHabit),
          smokingHabit: faker.helpers.enumValue(SmokingHabit),
          livingSituation: faker.helpers.enumValue(LivingSituation),
          maritalHistory: faker.helpers.enumValue(MaritalHistory),
          hasChildren: faker.helpers.enumValue(HasChildren),
          marriageIntention: faker.helpers.enumValue(MarriageIntention),
          wantsChildren: faker.helpers.enumValue(WantsChildren),
          houseworkChildcare: faker.helpers.enumValue(HouseworkChildcare),
          meetingPreference: faker.helpers.enumValue(MeetingPreference),
          dateExpense: faker.helpers.enumValue(DateExpense),
          sociability: faker.helpers.enumValue(Sociability),
          userProfileUpdate: {
            create: {}
          }
        }
      })
    )
  );
};
