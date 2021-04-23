import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToTimeString } from 'utils/functions';
import api from 'services/api';

import {
  Container,
  ThumbContainer,
  Header,
  EpisodeDescription,
} from 'styles/pages/episodes';

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

  useEffect(() => {
    const descriptionContainer = document.getElementsByClassName(
      'episode-description',
    );

    if (descriptionContainer[0]) {
      descriptionContainer[0].innerHTML = episode.description;
    }
  }, [episode.description]);

  return (
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
        <button type="button">
          <img src="/play.svg" alt="change episode" />
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
  );
};

export default Episode;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<Episode[]>('episodes', {
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
