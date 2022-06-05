// pages/_app.js
import React, { useEffect } from 'react';
import Head from 'next/head';
// import { initGA, logPageView } from '../lib/analytics';
import '../styles/reset.css';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   if (!(window )['GA_INITIALIZED']) {
  //     initGA();
  //     (window)['GA_INITIALIZED'] = true;
  //   }
  //   logPageView();
  // }, []);

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        ></meta>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge'></meta>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
