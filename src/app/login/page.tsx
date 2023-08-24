/* eslint-disable @next/next/no-img-element */
'use client';
import LoginForm from '@/components/login-form';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

type Props = {};

function Login({}: Props) {
  const router = useRouter();
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-blue-400'>
      <div className='bg-white p-5 rounded-md'>
        <h1 className='text-xl font-medium text-center'>Login</h1>
        <LoginForm />
        {/* 
            Choose Login method
        */}
        <div className='flex flex-col gap-3'>
          <div className='flex justify-center'>
            <img
              className='w-10 h-10 cursor-pointer'
              src='/assets/images/google.png'
              alt='login-method'
            />
            <img
              className='w-10 h-10 cursor-pointer'
              src='/assets/images/github.png'
              alt='login-method'
            />
          </div>
          <img
            onClick={async () => {
              await signIn('keycloak', { redirect: false, callbackUrl: '/' });
              // NextResponse.redirect('/');
              router.replace('/');
            }}
            className=' h-10 object-cover cursor-pointer'
            src='/assets/images/keycloak.png'
            alt='login-method'
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
