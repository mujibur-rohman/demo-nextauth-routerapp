'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

type Props = {};

function Navbar({}: Props) {
  const session = useSession();

  if (!session.data) {
    return null;
  }

  return (
    <nav className='h-14 bg-blue-400 flex justify-between items-center px-3'>
      <span className='font-medium text-lg text-white'>Auth</span>
      <ul className='flex items-center gap-5 text-white'>
        <Link href='/'>Home</Link>
        <Link href='/protect'>ProtectPage</Link>
        <Link href='/keycloak'>KeycloakPage</Link>
        <Link href='/credential'>CredentialPage</Link>
        <div className='cursor-pointer' onClick={() => signOut()}>
          Log Out
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
