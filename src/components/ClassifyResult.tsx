import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

import organic_trash from '../../public/tong_sampah_organik.png';
import reusable_trash from '../../public/tong_sampah_reusable.png';

export type ClassifyResultType = {
  type: 'Organic' | 'Reusable';
};

const ClassifyResult = ({ type }: ClassifyResultType) => {
  return (
    <div
      className={clsxm(
        'bg-gray-200 dark:bg-dark',
        'flex items-center justify-center',
        'text-lg'
      )}
    >
      <div className=''>
        {type === 'Organic' ? (
          <Image src={organic_trash} alt='Risaikuru' width={200} height={200} />
        ) : (
          <Image
            src={reusable_trash}
            alt='Risaikuru'
            width={200}
            height={200}
          />
        )}
      </div>
      <div className='max-w-[50%] space-y-8'>
        <p className='space-x-4 text-xl font-black'>
          <FaCheckCircle className='inline text-2xl text-green-300' />
          <span>{type === 'Organic' ? 'Organic' : 'Reusable'}</span>
        </p>
        {type === 'Organic' ? (
          <p>
            Organic waste decomposes on its own. You can dispose of it in the{' '}
            <span className='font-extrabold text-green-300'>green garbage</span>{' '}
            container.
          </p>
        ) : (
          <p>
            Reusable garbage can be repurposed to serve new purposes. You can
            dispose of it in the{' '}
            <span className='font-extrabold text-yellow-300'>
              yellow garbage
            </span>{' '}
            container.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassifyResult;
