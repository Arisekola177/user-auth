// src/lib/activateUser.ts
import prisma from '../lib/prisma';
import { verifyJwt } from '@/lib/jwt';

export type ActivateUserFunc = (jwtUserId: string) => Promise<'userNotExist' | 'alreadyActivated' | 'success'>;

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId);
  const userId = payload?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return 'userNotExist';
  if (user.emailVerified) return 'alreadyActivated';

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return 'success';
};
