import {
  AnnualIncomeRange,
  BloodType,
  BodyType,
  DateExpense,
  DrinkingHabit,
  EducationLevel,
  HasChildren,
  Holiday,
  HouseworkChildcare,
  LivingSituation,
  LoginStatus,
  MaritalHistory,
  MarriageIntention,
  MeetingPreference,
  Occupation,
  SiblingPosition,
  SmokingHabit,
  Sociability,
  WantsChildren
} from '@prisma/client';
import { JSONSchema } from 'json-schema-to-ts';
import { GenerateRequestTypes, GenerateResponseTypes } from '@/types';

/**
 * GET: /users/:userId/profile
 */
export const schemas = {
  get: {
    tags: ['user'],
    description: 'ユーザープロフィール情報取得API',
    headers: {
      type: 'object',
      properties: {
        authorization: {
          type: 'string'
        }
      }
    } as const satisfies JSONSchema,
    params: {
      type: 'object',
      properties: {
        userId: { type: 'string' }
      },
      required: ['userId']
    } as const satisfies JSONSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nickname: { type: 'string' },
          age: { type: 'number' },
          currentLoginStatus: {
            type: 'string',
            enum: Object.values(LoginStatus)
          },
          receivedLikes: { type: 'number' },
          introduction: { type: 'string' },
          bloodType: {
            type: 'string',
            enum: Object.values(BloodType),
            nullable: true
          },
          height: { type: 'number', nullable: true },
          bodyType: {
            type: 'string',
            enum: Object.values(BodyType),
            nullable: true
          },
          residencePrefecture: { type: 'string', nullable: true },
          residenceCity: { type: 'string', nullable: true },
          birthplace: { type: 'string', nullable: true },
          workplacePrefecture: { type: 'string', nullable: true },
          workplaceCity: { type: 'string', nullable: true },
          siblingPosition: {
            type: 'string',
            enum: Object.values(SiblingPosition),
            nullable: true
          },
          educationLevel: {
            type: 'string',
            enum: Object.values(EducationLevel),
            nullable: true
          },
          schoolName: { type: 'string', nullable: true },
          annualIncomeRange: {
            type: 'string',
            enum: Object.values(AnnualIncomeRange),
            nullable: true
          },
          occupation: {
            type: 'string',
            enum: Object.values(Occupation),
            nullable: true
          },
          occupationName: { type: 'string', nullable: true },
          holiday: {
            type: 'string',
            enum: Object.values(Holiday),
            nullable: true
          },
          drinkingHabit: {
            type: 'string',
            enum: Object.values(DrinkingHabit),
            nullable: true
          },
          smokingHabit: {
            type: 'string',
            enum: Object.values(SmokingHabit),
            nullable: true
          },
          livingSituation: {
            type: 'string',
            enum: Object.values(LivingSituation),
            nullable: true
          },
          maritalHistory: {
            type: 'string',
            enum: Object.values(MaritalHistory),
            nullable: true
          },
          hasChildren: {
            type: 'string',
            enum: Object.values(HasChildren),
            nullable: true
          },
          marriageIntention: {
            type: 'string',
            enum: Object.values(MarriageIntention),
            nullable: true
          },
          wantsChildren: {
            type: 'string',
            enum: Object.values(WantsChildren),
            nullable: true
          },
          houseworkChildcare: {
            type: 'string',
            enum: Object.values(HouseworkChildcare),
            nullable: true
          },
          meetingPreference: {
            type: 'string',
            enum: Object.values(MeetingPreference),
            nullable: true
          },
          dateExpense: {
            type: 'string',
            enum: Object.values(DateExpense),
            nullable: true
          },
          sociability: {
            type: 'string',
            enum: Object.values(Sociability),
            nullable: true
          },
          languages: {
            type: 'array',
            items: { type: 'string' },
            nullable: true
          },
          personalityTypes: {
            type: 'array',
            items: { type: 'string' },
            nullable: true
          }
        },
        required: [
          'id',
          'nickname',
          'age',
          'currentLoginStatus',
          'receivedLikes',
          'introduction'
        ]
      } as const satisfies JSONSchema,
      400: {
        description: 'リクエストが不正です',
        type: 'object',
        properties: {
          error: { type: 'string' }
        },
        required: ['error']
      } as const satisfies JSONSchema,
      404: {
        description: 'ユーザーが見つかりません',
        type: 'object',
        properties: {
          error: { type: 'string', enum: ['ユーザーが見つかりません'] }
        },
        required: ['error']
      } as const satisfies JSONSchema,
      409: {
        description: '既に退会済みです',
        type: 'object',
        properties: {
          error: { type: 'string', enum: ['既に退会済みです'] }
        },
        required: ['error']
      } as const satisfies JSONSchema,
      500: {
        description: 'サーバーエラー',
        type: 'object',
        properties: {
          error: { type: 'string', enum: ['Internal Server Error'] }
        },
        required: ['error']
      } as const satisfies JSONSchema
    }
  }
};

export type GetUserProfileRequest = GenerateRequestTypes<typeof schemas.get>;

export type GetUserProfileResponse = GenerateResponseTypes<
  typeof schemas.get.response
>;
