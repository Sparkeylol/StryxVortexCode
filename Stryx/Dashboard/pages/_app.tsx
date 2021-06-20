/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'next-auth/client';
import { loadIntercom } from '@jackmerrill/next-intercom';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from '../components/animations/Loading';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  if (router.route !== '/404') {
    loadIntercom({
      appId: 'ajm5n97i',
      name: pageProps.token?.user.username,
      discriminator: pageProps.token?.user.discriminator,
      discord_id: pageProps.token?.user.id,
      ssr: false,
      initWindow: true,
      delay: 0,
      avatar: {
        "type": "avatar", 
        "image_url" :`https://cdn.discordapp.com/avatars/${pageProps.token?.user.id}/${pageProps.token?.user.avatar}`
      }
    });
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      setLoading(true);
    };
    const handleComplete = (url: string) => {
      setTimeout(() => setLoading(false), 300);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // misc console info
    window.console.log('%cHold Up!', 'color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;');
    window.console.log('%cIf you were told to paste anything in here, it\'s most likely a scam.', 'color: #ba2825; -webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;');
    window.console.log('%cPasting anything in here could give attackers to access your workspace.', 'color: #ba2825; -webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;');
    window.console.log('%cIf you don\'t understand anything, close this window.', '-webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;');
    window.console.log('%cIf you do understand what you\'re doing, come work with us! https://stryx.cloud/jobs', '-webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;');
  });


  return (
    <Provider session={pageProps.session}>
      <Toaster position="top-center" />
      <ThemeProvider attribute="class">
        <AnimatePresence exitBeforeEnter>
          <Loading loading={loading} />
        </AnimatePresence>
        <Component {...pageProps} className="z-0" />
      </ThemeProvider>
    </Provider>
  );
}
