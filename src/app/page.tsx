import HomePage from '@/components/home';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

type Props = {
  req: NextRequest;
};

async function Home({ req }: Props) {
  const session = await getServerSession();
  return (
    <div className='w-full h-[90vh] flex justify-center items-center'>
      <HomePage />
    </div>
  );
}

export default Home;
