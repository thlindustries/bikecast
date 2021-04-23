import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { FiChevronRight } from 'react-icons/fi';

import { usePlayer } from 'hooks/player';

import {
  Container,
  CollapseButton,
  EmptyPlayer,
  CurrentEpisode,
  Footer,
  Progress,
  SliderWrapper,
  ButtonsContainer,
} from './styles';

const Player: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    setPlayingState,
    togglePlay,
  } = usePlayer();

  const episode = useMemo(() => episodeList[currentEpisodeIndex], [
    episodeList,
    currentEpisodeIndex,
  ]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

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

        {episode ? (
          <CurrentEpisode>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </CurrentEpisode>
        ) : (
          <EmptyPlayer>
            <strong>Selecione um poadcast para ouvir</strong>
          </EmptyPlayer>
        )}
        <Footer empty={!episode}>
          <Progress at={1}>
            <span>00:00</span>
            <SliderWrapper>
              {episode ? (
                <Slider
                  trackStyle={{
                    backgroundColor: '#04d361',
                  }}
                  railStyle={{
                    backgroundColor: '#9f75ff',
                  }}
                  handleStyle={{
                    borderColor: '#04d361',
                    borderWidth: 4,
                  }}
                />
              ) : (
                <div className="slider" />
              )}
            </SliderWrapper>
            <span>00:00</span>
          </Progress>

          {episode && (
            <audio
              src={episode.url}
              ref={audioRef}
              autoPlay
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)}
            >
              <track src="" kind="captions" srcLang="pt" label="pt_captions" />
            </audio>
          )}

          <ButtonsContainer>
            <button type="button" disabled={!episode}>
              <img src="/shuffle.svg" alt="shuffle icon" />
            </button>
            <button type="button" disabled={!episode}>
              <img src="/play-previous.svg" alt="play previous" />
            </button>

            <button
              type="button"
              className="play-button"
              disabled={!episode}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <img src="/pause.svg" alt="play" />
              ) : (
                <img src="/play.svg" alt="play" />
              )}
            </button>

            <button type="button" disabled={!episode}>
              <img src="/play-next.svg" alt="play next" />
            </button>

            <button type="button" disabled={!episode}>
              <img src="/repeat.svg" alt="repeat" />
            </button>
          </ButtonsContainer>
        </Footer>
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
