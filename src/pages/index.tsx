import type { NextPage } from 'next';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

import risaikuru_logo from '../../public/risaikuru_trans.png';
import risaikuru_dark_logo from '../../public/risaikuru_trans_dark.png';

const Home: NextPage = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <Seo />
      <main>
        <section>
          <div className='layout flex flex-col items-center justify-center text-center'>
            <div>
              {theme === 'dark' ? (
                <Image
                  src={risaikuru_dark_logo}
                  alt='Risaikuru'
                  width={300}
                  height={300}
                />
              ) : (
                <Image
                  src={risaikuru_logo}
                  alt='Risaikuru'
                  width={300}
                  height={300}
                />
              )}
              <h1 className='text-2xl md:text-5xl'>
                <Accent>A web service to classify your trash</Accent>
              </h1>
              <ArrowLink
                href='/classify'
                className='my-4 text-3xl dark:text-gray-300'
              >
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
