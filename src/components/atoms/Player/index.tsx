import React, { useState, useCallback } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import {
  Container,
  CollapseButton,
  EmptyPlayer,
  Progress,
  SliderWrapper,
  ButtonsContainer,
} from './styles';

const Player: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Container isCollapsed={isCollapsed}>
      <CollapseButton
        isCollapsed={isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FiChevronRight size={32} />
      </CollapseButton>
      <div className="content">
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
      </div>
      {isCollapsed && (
        <div>
          <header>
            <img src="/playing.svg" alt="playing now" />
          </header>
        </div>
      )}
    </Container>
  );
};

export default Player;
