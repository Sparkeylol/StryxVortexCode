/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import Head from 'next/head';

export default function AnimatedGradient(props: any): JSX.Element {
  return (
    <>
      <Head>
        <script src="js/AnimatedGradient.js" />
      </Head>
      <canvas id="gradient-canvas" {...props} />
    </>
  );
}
