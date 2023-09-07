import { User } from '@/utils/checkLogin';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {};

function LoginForm({}: Props) {
  const session = useSession();
  const router = useRouter();

  const [errorLogin, setErrorLogin] = useState<string>('');
  const [formInput, setFormInput] = useState<User>({
    username: '',
    password: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formInput.username.trim() && formInput.password.trim()) {
      const res = await signIn('credentials', {
        username: formInput.username,
        password: formInput.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorLogin(res.error);
        return;
      }

      if (res?.ok) {
        setFormInput({ password: '', username: '' });
        router.push('/');
      }
    }
  };

  return (
    <form onSubmit={submitHandler} className=" p-5">
      {errorLogin && (
        <span className="text-red-400 text-sm mb-3 block">{errorLogin}</span>
      )}
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={formInput.username}
          onChange={changeHandler}
          type="text"
          name="username"
          id="username"
          placeholder=" "
        />
        <label
          htmlFor="username"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Username
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={formInput.password}
          onChange={changeHandler}
          type="password"
          name="password"
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <button className="bg-blue-400 w-full py-2 rounded-md text-white">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
