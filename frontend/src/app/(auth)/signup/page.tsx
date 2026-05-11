'use client';

import { signUp } from '@/app/actions/auth-actions';
import { signIn } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = await signUp({
      email,
      password,
    });

    if (result?.status === 'error') {
      alert(result.message);
      return;
    }

    if (result?.status === 'ok') {
      redirect('/signin');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold'>회원가입</h1>
      <p className='text-sm text-gray-500'>
        인프런에서 다양한 학습의 기회를 얻으세요
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
        <label>비밀번호 확인</label>
        <input
          type='password'
          name='passwordConfirm'
          placeholder='비밀번호 확인'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className='border-2 border-gray-300 rounded-sm p-2'
        />

        <button
          type='submit'
          className='bg-green-500 rounded-sm p-2 cursor-pointer font-bold text-white'
        >
          회원가입
        </button>
        <Link
          href='/signin'
          className='border-2 border-gray-300 rounded-sm p-2 cursor-pointer text-center font-bold text-gray-500 hover:text-gray-700'
        >
          로그인
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
