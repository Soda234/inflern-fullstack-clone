'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react'; // 클라이언트컴포넌트에서는 해당 함수를 사용해야 함.
import { useState } from 'react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold'>로그인</h1>
      <p className='text-sm text-gray-500'>
        인프런 계정으로 로그인 할 수 있어요
      </p>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 min-w-[300px]'
      >
        <label>이메일</label>
        <input
          type='email'
          name='email'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border-2 border-gray-300 rounded-sm p-2'
        />
        <label>비밀번호</label>
        <input
          type='password'
          name='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border-2 border-gray-300 rounded-sm p-2'
        />

        <button
          type='submit'
          className='bg-green-500 rounded-sm p-2 cursor-pointer font-bold text-white'
        >
          로그인
        </button>
        <Link
          href='/signup'
          className='border-2 border-gray-300 rounded-sm p-2 cursor-pointer text-center font-bold text-gray-500 hover:text-gray-700'
        >
          회원가입
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
