/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Image from 'next/image';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import risaikuru_logo from '../../public/risaikuru_trans_dark.png';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-black'>
          <div className='layout flex flex-col items-center justify-center text-center'>
            <div>
              <Image
                src={risaikuru_logo}
                alt='Risaikuru'
                width={300}
                height={300}
              />
              <h1 className='text-2xl md:text-5xl'>
                <Accent>A web service to classify your trash</Accent>
              </h1>
              <ArrowLink href='/classify' className='my-4 text-3xl'>
                Let{"'"}s go
              </ArrowLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
