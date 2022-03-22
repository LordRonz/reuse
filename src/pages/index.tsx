/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-black'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1>Next.js + Tailwind CSS + TypeScript Starter</h1>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
