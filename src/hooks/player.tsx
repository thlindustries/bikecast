import React, { createContext, useState, useCallback, useContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  toggleLoop(): void;
  togglePlay(): void;
  toggleShufle(): void;
  setPlayingState(state: boolean): void;
  playList(list: Episode[], index: number): void;
  play(episode: Episode): void;
  handleChangeItem(action: string): void;
  clearPLayerState(): void;
};

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  const play = useCallback((episode: Episode) => {
    setEpisodeList([episode]);
    setIsPlaying(true);
    setCurrentEpisodeIndex(0);
  }, []);

  const playList = useCallback((list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleLoop = useCallback(() => {
    setIsLooping(!isLooping);
  }, [isLooping]);

  const toggleShufle = useCallback(() => {
    setIsShuffling(!isShuffling);
  }, [isShuffling]);

  const setPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  const handleChangeItem = useCallback(
    (action: string) => {
      const randomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

      if (action === 'next') {
        if (!hasNext && !isShuffling) {
          return;
        }
        if (isShuffling) {
          setCurrentEpisodeIndex(randomEpisodeIndex);
        } else {
          setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
      }
      if (action === 'previous') {
        if (!hasPrevious && !isShuffling) {
          return;
        }
        if (isShuffling) {
          setCurrentEpisodeIndex(randomEpisodeIndex);
        } else {
          setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
      }
    },
    [currentEpisodeIndex, hasNext, hasPrevious, isShuffling, episodeList],
  );

  const clearPLayerState = useCallback(() => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        hasPrevious,
        hasNext,
        togglePlay,
        toggleLoop,
        toggleShufle,
        setPlayingState,
        playList,
        play,
        handleChangeItem,
        clearPLayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  return context;
}
