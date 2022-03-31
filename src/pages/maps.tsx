import type { NextPage } from 'next';

import Layout from '@/components/layout/Layout';
import Maps from '@/components/Maps';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <main>
        <section>
          <div className='layout flex h-[80vh] w-full flex-col items-center justify-center text-center'>
            <Maps />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
