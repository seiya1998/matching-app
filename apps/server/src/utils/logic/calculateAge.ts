import { differenceInYears } from 'date-fns';

export const calculateAge = (
  birthYear: number,
  birthMonth: number,
  birthDay: number
): number =>
  differenceInYears(new Date(), new Date(birthYear, birthMonth - 1, birthDay));
