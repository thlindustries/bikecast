import React, { useMemo } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaPause } from 'react-icons/fa';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from 'services/api';
import { convertDurationToTimeString } from 'utils/functions';
import { usePlayer } from 'hooks/player';

import Seo from 'components/atoms/Seo';

import {
  Container,
  LatestEpisodes,
  AllEpisodes,
  EpisodeDetails,
} from 'styles/pages/home';

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
};

type FormatedEpisode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  duration: number;
  durationAsString: string;
};

type HomeProps = {
  latestEpisodes: Array<FormatedEpisode>;
  allEpisodes: Array<FormatedEpisode>;
};

const Home: React.FunctionComponent<HomeProps> = ({
  allEpisodes,
  latestEpisodes,
}) => {
  const {
    playList,
    isPlaying,
    currentEpisodeIndex,
    setPlayingState,
  } = usePlayer();

  const episodeList = useMemo(() => [...latestEpisodes, ...allEpisodes], [
    latestEpisodes,
    allEpisodes,
  ]);

  return (
    <>
      <Seo title="Bike Cast" />
      <Container className="hasVerticalScroll">
        <LatestEpisodes>
          <h2>Últimos lançamentos</h2>
          <ul>
            {latestEpisodes.map((episode, index) => (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <EpisodeDetails>
                  <Link href={`/episodes/${episode.id}`}>
                    <span className="episode-title-link">{episode.title}</span>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </EpisodeDetails>
                <button
                  type="button"
                  onClick={
                    isPlaying && index === currentEpisodeIndex
                      ? () => setPlayingState(false)
                      : () => playList(episodeList, index)
                  }
                >
                  {isPlaying && index === currentEpisodeIndex ? (
                    <FaPause size={16} />
                  ) : (
                    <img src="/play-green.svg" alt="play green" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </LatestEpisodes>
        <AllEpisodes>
          <h2>Todos episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>-</th>
                <th>Poadcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map((episode, index) => (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href="_blank">
                      <span className="episode-title-link">
                        {episode.title}
                      </span>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={
                        isPlaying &&
                        index + latestEpisodes.length === currentEpisodeIndex
                          ? () => setPlayingState(false)
                          : () =>
                              playList(
                                episodeList,
                                index + latestEpisodes.length,
                              )
                      }
                    >
                      {isPlaying &&
                      index + latestEpisodes.length === currentEpisodeIndex ? (
                        <FaPause size={16} />
                      ) : (
                        <img src="/play-green.svg" alt="Play episode" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AllEpisodes>
      </Container>
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (
//   ctx,
// ): Promise<any> => {
//   const response = await fetch('http://localhost:3333/episodes');
//   const data = await response.json();

//   return {
//     props: {
//       episodes: data,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get<Array<Episode>>('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((episode) => ({
    id: episode.id,
    title: episode.title,
    thumbnail: episode.thumbnail,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(
      Number(episode.file.duration),
    ),
    url: episode.file.url,
  }));

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 1,
  };
};
