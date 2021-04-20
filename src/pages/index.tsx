import React from 'react';
import { GetStaticProps, GetStaticPropsResult } from 'next';

import Head from 'next/head';

const Home: React.FunctionComponent = (props) => {
  console.log(props);

  return (
    <div>
      {/* <Head>
          <title>Poadcastr</title>
        </Head>
        <main>
          <h1>Oi </h1>
        </main> */}
    </div>
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

export const getStaticProps: GetStaticProps = async (
  ctx,
): Promise<GetStaticPropsResult<any>> => {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 1,
  };
};
