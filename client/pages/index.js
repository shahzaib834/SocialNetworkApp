import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Social Network App</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='text-center'>This is the home page</h1>
    </div>
  );
}
