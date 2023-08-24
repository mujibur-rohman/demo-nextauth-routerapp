'use client';
import { useSession } from 'next-auth/react';

type Props = {};

export default function HomePage({}: Props) {
  const session = useSession();
  console.log(session);
  return <div>Home</div>;
}
