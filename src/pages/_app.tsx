import React from 'react';
import { AppProps } from 'next/app';

import AppProvider from 'hooks';

import Header from 'components/atoms/Header';
import Player from 'components/atoms/Player';

import GlobalStyle from 'styles/global';
import { Container } from 'styles/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <>
    <GlobalStyle />
    <Container>
      <AppProvider>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </AppProvider>
    </Container>
  </>
);

export default MyApp;
