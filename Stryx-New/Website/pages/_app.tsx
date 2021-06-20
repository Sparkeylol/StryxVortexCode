/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { AppProps } from 'next/app';

import '../styles/index.css';

function StryxApp({ Component, pageProps }: AppProps) {
  return (
    <div id="app">
      <Component {...pageProps} />
    </div>
  );
}

export default StryxApp;
