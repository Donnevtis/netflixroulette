/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import store from '@src/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../index.scss';
import '../index.css';
import 'normalize.css';

const Main = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default Main;
