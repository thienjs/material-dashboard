import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import AppBarWithSidebar from '../components/MainLayout';
import { ArticlesContextProvider } from '../context/ArticlesContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider>
        <ArticlesContextProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppBarWithSidebar>
            <Component {...pageProps} />
          </AppBarWithSidebar>
        </ArticlesContextProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
