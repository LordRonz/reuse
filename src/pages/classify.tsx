import type { NextPage } from 'next';

import Seo from '@/components/Seo';

const Classify: NextPage = () => (
  <>
    <Seo templateTitle='Classify Trash' />
    <main>
      <section className='bg-black'>
        <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-40 text-center'></div>
      </section>
    </main>
  </>
);

export default Classify;
