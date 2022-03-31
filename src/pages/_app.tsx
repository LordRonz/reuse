import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';

import { toastStyle, toastStyleLight } from '@/components/constant/toast';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useTheme();

  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <NextNProgress
        color='#97DBAE'
        startPosition={0.2}
        options={{ showSpinner: false }}
      />
      <Toaster
        toastOptions={{
          style: theme === 'dark' ? toastStyle : toastStyleLight,
          loading: {
            iconTheme: {
              primary: '#71f397',
              secondary: 'black',
            },
          },
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
