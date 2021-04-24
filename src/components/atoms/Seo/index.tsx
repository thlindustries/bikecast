import React from 'react';

import Head from 'next/head';

type SeoProps = {
  title: string;
};

const Seo: React.FC<SeoProps> = ({ title }) => {
  const getTitle = (): string =>
    title !== 'Bike Cast' ? `Bike Cast | ${title}` : 'Bike Cast';

  return (
    <Head>
      <title>{getTitle()}</title>
    </Head>
  );
};

export default Seo;
