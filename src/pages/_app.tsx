import React from 'react';
import { AppProps } from 'next/app';

import Header from 'components/atoms/Header';
import Player from 'components/atoms/Player';

import GlobalStyle from 'styles/global';
import { Container } from 'styles/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <>
    <GlobalStyle />
    <Container>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </Container>
  </>
);

export default MyApp;
