import axios from 'axios';
import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Accent from '@/components/Accent';
import ClassifyResult from '@/components/ClassifyResult';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Webcam from '@/components/Webcam';

const MeSwal = withReactContent(Swal);

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
  const { theme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<string>();

  const onCapture = (img: string | null) => {
    if (img) {
      const image = img.split('base64,')[1];
      setSelectedFile(image);
      handleSubmit(image);
    }
  };

  const handleSubmit = async (img: string | null) => {
    if (!selectedFile && !img) {
      toast.error('Please upload an image');
      return;
    }
    toast.promise(
      axios.post<API_RESPONSE>('/api/classifycam', {
        buffer: selectedFile || img,
        mimetype: 'image/jpeg',
      }),
      {
        loading: 'Loading...',
        success: ({ data }) => {
          const result =
            data[0].probability > data[1].probability
              ? data[0].className
              : data[1].className;
          MeSwal.fire({
            html: <ClassifyResult type={result} />,
            color: theme === 'dark' ? '#ddd' : '#111',
            confirmButtonColor: '#71f397',
            background: theme === 'dark' ? '#111' : '#ddd',
          });
          return result;
        },
        error: (err: Error) => {
          if (axios.isAxiosError(err)) {
            return err.response?.data.message ?? err.message;
          }
          return err.message;
        },
      }
    );
  };

  return (
    <Layout>
      <Seo templateTitle='Classify Trash' />
      <main>
        <section>
          <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-16 text-center'>
            <h1>
              <Accent className='dark:from-primary-100 dark:via-green-100/70 dark:to-emerald-100'>
                Capture your trash
              </Accent>
            </h1>
            <Webcam onCapture={onCapture} width={640} height={480} />
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Classify;
