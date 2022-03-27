import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <NextNProgress
        color='#97DBAE'
        startPosition={0.2}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
