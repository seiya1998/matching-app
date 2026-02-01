import { FastifyRequest } from 'fastify';
import { GetUserProfileRequest } from './schema';
import { Result } from '@/types';
import { validateParams } from '@/utils/validate';

export const extractParamsForGetUserProfile = (
  request: FastifyRequest<GetUserProfileRequest>
): Result<{ userId: string }, { errorCode: 400 }> => {
  return validateParams<{ userId: string }>(request.params, {
    userId: ['required', 'cuid']
  });
};
