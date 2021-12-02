import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { SWRConfig } from 'swr'
import { fetchJson } from '../src/lib';
import AuthProvider from '../src/providers/auth-provider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Unsplash Image earch Application</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => console.error({ SWRError: err }),
          provider: () => new Map()
        }}
      >
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthProvider>
      </SWRConfig>
    </CacheProvider>
  );
}
