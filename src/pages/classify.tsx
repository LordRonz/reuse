import axios from 'axios';
import type { NextPage } from 'next';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import { toastStyle } from '@/components/constant/toast';
import Seo from '@/components/Seo';

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

type API_RESPONSE = [
  {
    className: 'Organic';
    probability: number;
  },
  {
    className: 'Reusable';
    probability: number;
  }
];

const Classify: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<Blob>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    e.preventDefault();
    if (
      e?.currentTarget?.files?.[0]?.type &&
      !SUPPORTED_IMAGE_TYPES.includes(e.currentTarget.files[0].type)
    ) {
      e.target.value = '';
      setSelectedFile(undefined);
      toast.error('File must be an image (jpeg, png, gif)');
      return;
    }
    setSelectedFile(e?.currentTarget?.files?.[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please upload an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    toast.promise(
      axios.post<API_RESPONSE>(`http://20.231.52.92/classify`, formData),
      {
        loading: 'Loading...',
        success: ({ data }) => {
          if (data[0].probability > data[1].probability)
            return data[0].className;
          return data[1].className;
        },
        error: (err: Error) => {
          if (axios.isAxiosError(err)) {
            return err.response?.data.message ?? err.message;
          }
          return 'Error occured';
        },
      }
    );
  };

  return (
    <>
      <Seo templateTitle='Classify Trash' />
      <main>
        <section className='bg-black'>
          <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-40 text-center'>
            <form onSubmit={handleSubmit}>
              <input
                type='file'
                name='image'
                id='imageInput'
                onChange={onFileChange}
              />
              <div className='mt-2'>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Toaster
        toastOptions={{
          style: toastStyle,
          loading: {
            iconTheme: {
              primary: '#71f397',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
};

export default Classify;
