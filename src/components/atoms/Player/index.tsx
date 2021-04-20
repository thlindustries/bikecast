import React from 'react';

import {
  Container,
  EmptyPlayer,
  Progress,
  SliderWrapper,
  ButtonsContainer,
} from './styles';

const Player: React.FC = () => (
  <Container>
    <header>
      <img src="/playing.svg" alt="playing now" />
      <strong>Tocando agora</strong>
    </header>
    <EmptyPlayer>
      <strong>Selecione um poadcast para ouvir</strong>
    </EmptyPlayer>
    <footer>
      <Progress at={0}>
        <span>00:00</span>
        <SliderWrapper>
          <div className="slider" />
        </SliderWrapper>
        <span>00:00</span>
      </Progress>
      <ButtonsContainer>
        <button type="button">
          <img src="/shuffle.svg" alt="shuffle icon" />
        </button>
        <button type="button">
          <img src="/play-previous.svg" alt="play previous" />
        </button>
        <button type="button" className="play-button">
          <img src="/play.svg" alt="play" />
        </button>

        <button type="button">
          <img src="/play-next.svg" alt="play next" />
        </button>

        <button type="button">
          <img src="/repeat.svg" alt="repeat" />
        </button>
      </ButtonsContainer>
    </footer>
  </Container>
);

export default Player;
