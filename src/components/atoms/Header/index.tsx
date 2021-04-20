import React from 'react';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { Container } from './styles';

const Header: React.FC = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', {
    locale: ptBR,
  });

  return (
    <Container>
      <img src="/logo.svg" alt="logo-poadcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </Container>
  );
};

export default Header;
