import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword } from './lib/password-util';

const config = {
  useSecureCookies: process.env.NODE_ENV === 'production',
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: '이메일을 입력해주세요.',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력해주세요.',
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          throw new Error('존재하지 않는 유저입니다.');
        }

        const passwordMatch = comparePassword(
          credentials.password as string,
          user.hashedPassword as string,
        );

        if (!passwordMatch) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,

};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export const { auth: middlewareAuth } = NextAuth({
  providers: [],
});
