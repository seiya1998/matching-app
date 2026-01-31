import { JSONSchema } from 'json-schema-to-ts';
import { GenerateRequestTypes, GenerateResponseTypes } from '@/types';
import {
  Gender,
  LoginStatus,
  MembershipStatus
} from 'prisma/generated/prisma/client';

/**
 * GET: /users/me
 */
export const schemas = {
  get: {
    tags: ['user'],
    description: 'ユーザー自身の情報取得API',
    headers: {
      type: 'object',
      properties: {
        authorization: {
          type: 'string'
        }
      }
    } as const satisfies JSONSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          remainingLikes: { type: 'number' },
          nickname: { type: 'string' },
          age: { type: 'number' },
          gender: {
            type: 'string',
            enum: Object.values(Gender)
          },
          currentMembershipStatus: {
            type: 'string',
            enum: Object.values(MembershipStatus)
          },
          currentLoginStatus: {
            type: 'string',
            enum: Object.values(LoginStatus)
          },
          mainImageUrl: { type: 'string', nullable: true }
        },
        required: [
          'id',
          'remainingLikes',
          'nickname',
          'age',
          'gender',
          'currentMembershipStatus',
          'currentLoginStatus'
        ]
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

export type GetCurrentUserRequest = GenerateRequestTypes<typeof schemas.get>;

export type GetCurrentUserResponse = GenerateResponseTypes<
  typeof schemas.get.response
>;
