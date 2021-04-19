import React from 'react';
import { AppProps } from 'next/app';

import GlobalStyle from 'styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default MyApp;
