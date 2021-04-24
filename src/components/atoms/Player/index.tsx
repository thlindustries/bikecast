import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { FiChevronRight } from 'react-icons/fi';

import { usePlayer } from 'hooks/player';

import { convertDurationToTimeString } from 'utils/functions';
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
  const [progress, setProgress] = useState(0);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    setPlayingState,
    toggleLoop,
    togglePlay,
    toggleShufle,
    handleChangeItem,
    clearPLayerState,
  } = usePlayer();

  const audioRef = useRef<HTMLAudioElement>(null);

  const setupAudigoProgressListener = useCallback(() => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }, [audioRef]);

  const handleMoveSlider = useCallback((progressTime: number) => {
    audioRef.current.currentTime = progressTime;
    setProgress(progressTime);
  }, []);

  const handleEpisodeEnded = useCallback(() => {
    setProgress(0);
    if (hasNext) {
      handleChangeItem('next');
    } else {
      clearPLayerState();
    }
  }, [handleChangeItem, hasNext, clearPLayerState]);

  const episode = useMemo(() => episodeList[currentEpisodeIndex], [
    episodeList,
    currentEpisodeIndex,
  ]);

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
            <span>{convertDurationToTimeString(progress)}</span>
            <SliderWrapper>
              {episode ? (
                <Slider
                  max={episode.duration}
                  value={progress}
                  onChange={handleMoveSlider}
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
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </Progress>

          {episode && (
            <audio
              src={episode.url}
              ref={audioRef}
              autoPlay
              loop={isLooping}
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)}
              onEnded={handleEpisodeEnded}
              onLoadedMetadata={setupAudigoProgressListener}
            >
              <track src="" kind="captions" srcLang="pt" label="pt_captions" />
            </audio>
          )}
          <ButtonsContainer>
            <button
              type="button"
              disabled={!episode || episodeList.length === 1}
              onClick={toggleShufle}
              className={isShuffling ? 'active-button' : ''}
            >
              <img src="/shuffle.svg" alt="shuffle icon" />
            </button>
            <button
              type="button"
              onClick={() => handleChangeItem('previous')}
              disabled={!episode || (!hasPrevious && !isShuffling)}
            >
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

            <button
              type="button"
              onClick={() => handleChangeItem('next')}
              disabled={!episode || (!hasNext && !isShuffling)}
            >
              <img src="/play-next.svg" alt="play next" />
            </button>

            <button
              type="button"
              disabled={!episode}
              onClick={toggleLoop}
              className={isLooping ? 'active-button' : ''}
            >
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
