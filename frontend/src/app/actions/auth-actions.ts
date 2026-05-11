'use server';

import { saltAndHashPassword } from '@/lib/password-util';
import { prisma } from '../../../prisma';

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: '이미 존재하는 이메일입니다.' };
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: saltAndHashPassword(password),
      },
    });

    if (user) {
      return { status: 'ok' };
    }
  } catch (error) {
    console.error(error);
    return { status: 'error', message: '회원가입에 실패했습니다.' };
  }
};
