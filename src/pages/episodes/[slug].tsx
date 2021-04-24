import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaPause } from 'react-icons/fa';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from 'utils/functions';
import { usePlayer } from 'hooks/player';
import api from 'services/api';

import {
  Container,
  ThumbContainer,
  Header,
  EpisodeDescription,
} from 'styles/pages/episodes';
import Seo from 'components/atoms/Seo';

type EpisodeType = {
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
  description: string;
  url: string;
  duration: number;
  durationAsString: string;
};

type EpisodeProps = {
  episode: FormatedEpisode;
};

const Episode: React.FunctionComponent<EpisodeProps> = ({ episode }) => {
  const { push } = useRouter();
  const { play, isPlaying, setPlayingState } = usePlayer();

  useEffect(() => {
    const descriptionContainer = document.getElementsByClassName(
      'episode-description',
    );

    if (descriptionContainer[0]) {
      descriptionContainer[0].innerHTML = episode.description;
    }
  }, [episode.description]);

  return (
    <>
      <Seo title={episode.title} />
      <Container>
        <ThumbContainer>
          <button onClick={() => push('/')} type="button">
            <img src="/arrow-left.svg" alt="back arrow" />
          </button>
          <Image
            width={700}
            height={160}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <button
            type="button"
            onClick={
              isPlaying ? () => setPlayingState(false) : () => play(episode)
            }
          >
            {isPlaying ? (
              <FaPause size={16} />
            ) : (
              <img src="/play.svg" alt="play episode" />
            )}
          </button>
        </ThumbContainer>

        <Header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </Header>

        <EpisodeDescription className="episode-description" />
      </Container>
    </>
  );
};

export default Episode;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<EpisodeType[]>('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const paths = data.map((episode) => ({
    params: {
      slug: episode.id,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
