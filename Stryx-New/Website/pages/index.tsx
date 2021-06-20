/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import AnimatedGradient from '../components/AnimatedGradient';
import ArrowRight from '../components/Icons/ArrowRight';
import Navbar from '../components/Navbar';

const GroupShowcase: {
  name: string,
  image: string
}[] = [
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
  {
    name: 'Stryx',
    image: '/img/StryxLogo.png',
  },
];

const featureMap: {
  feature: string,
  image: string,
}[] = [
  {
    feature: 'bot',
    image: '/img/StryxLogo.png',
  },
];

class Timer {
  timerObj: number | null;
  fn: Function;
  t: number;
  constructor(fn: Function, t: number) {
    this.timerObj = setInterval(fn, t)
    this.fn = fn
    this.t = t
  }

  stop() {
    if (this.timerObj) {
      clearInterval(this.timerObj);
      this.timerObj = null;
    }
    return this;
  };

  // start timer using current settings (if it's not already running)
  start = () => {
    if (!this.timerObj) {
      this.stop();
      this.timerObj = setInterval(this.fn, this.t);
    }
    return this;
  };

  // start with new or original interval, stop current interval
  reset = (newT = this.t) => {
    this.t = newT;
    return this.stop().start();
  };
}

const IndexPage = () => {
  const [selectedFeature, setSelectedFeature] = useState('bot');

  const timer = new Timer(() => {
    const feats = ['bot', 'app', 'sms', 'more'];
    setSelectedFeature(feats[feats.indexOf(selectedFeature) + 1]);
  }, 10000);

  return (
    <>
      <div id="header" className="w-screen">
        <div className="flex w-full">
          <AnimatedGradient style={{ rotate: '-15deg' }} className="absolute block z-0 transform lg:-translate-y-96 -translate-y-72 lg:scale-125 scale-175 h-full w-inherit overflow-auto" />
        </div>
        <div className="absolute w-screen h-full z-10 transform xl:px-96 lg:px-48 px-12 space-y-10">
          <Navbar />
          <div className="flex flex-wrap">
            <div className="w-1/2">
              <h1 className="text-white font-black text-6xl">
                Meet
                <br />
                Stryx.
              </h1>
              <h3 className="text-white font-bold text-2xl overflow-ellipsis my-5">Stryx is the ultimate all-in-one platform for your Roblox group, 100% free.</h3>
              <div className="flex flex-wrap lg:space-x-10 lg:space-y-0 space-y-3 items-center">
                <Link passHref href="/">
                  <a className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-bold transform transition duration-300 hover:scale-105">
                    Get Started
                    <span className="pl-2">
                      <ArrowRight />
                    </span>
                  </a>
                </Link>
                <Link passHref href="/">
                  <a className="inline-flex items-center px-5 text-white font-bold transform transition duration-300 hover:scale-105">
                    Enterprise
                    <span className="pl-2">
                      <ArrowRight />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-1/2 hidden lg:flex content-end justify-end">
              <div className="w-96 h-72 bg-white opacity-80 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <div id="seperator" className="lg:h-screen h-screen-1.25" />
      <section id="groups" className="flex flex-wrap justify-center content-center">
        <h1 className="text-gray-900 font-extrabold text-3xl text-center w-full my-8">Used by Many</h1>
        <Marquee
          speed={50}
          gradientWidth={0}
        >
          {GroupShowcase.map((group) => (
            <img src={group.image} alt={group.name} title={group.name} className="w-64 h-64 p-2 transition-all rounded-2xl duration-150 opacity-75 hover:opacity-100" />
          ))}
        </Marquee>
      </section>
      <section id="about" className="flex flex-wrap xl:px-96 lg:px-48 px-12 py-12 space-y-3">
        <div className="flex flex-wrap w-1/2">
          <h1 className="text-purple-600 font-black text-4xl w-full">Who We Are</h1>
          <h3 className="text-gray-900 font-semibold text-2xl w-full">We’re a fully intergrated suite of Ro-tech products.</h3>
          <p className="text-gray-600 font-medium text-xl w-1/2">
            We bring together everything that’s required to function a Roblox group.
            Some of our products are our
            {' '}
            <button
              className={`${selectedFeature === 'bot' ? 'text-white' : 'text-purple-600'} ${selectedFeature === 'bot' ? 'bg-purple-600 p-0.5 rounded-sm' : ''} font-bold transition-all duration-150`}
              type="button"
              onClick={() => setSelectedFeature('bot')}
            >
              Bots
            </button>
            ,
            <button
              className={`${selectedFeature === 'app' ? 'text-white' : 'text-purple-600'} ${selectedFeature === 'app' ? 'bg-purple-600 p-0.5 rounded-sm' : ''} font-bold transition-all duration-150`}
              type="button"
              onClick={() => setSelectedFeature('app')}
            >
              Application Centers
            </button>
            ,
            <button
              className={`${selectedFeature === 'sms' ? 'text-white' : 'text-purple-600'} ${selectedFeature === 'sms' ? 'bg-purple-600 p-0.5 rounded-sm' : ''} font-bold transition-all duration-150`}
              type="button"
              onClick={() => setSelectedFeature('sms')}
            >
              Staff Management Systems
            </button>
            , and
            <button
              className={`${selectedFeature === 'more' ? 'text-white' : 'text-purple-600'} ${selectedFeature === 'more' ? 'bg-purple-600 p-0.5 rounded-sm' : ''} font-bold transition-all duration-150`}
              type="button"
              onClick={() => setSelectedFeature('more')}
            >
              more.
            </button>
          </p>
        </div>
        <div className="flex w-1/2 justify-end">
          <div className="w-3/4 bg-gray-100 rounded-xl">
            <img src={featureMap.find((v) => v.feature === selectedFeature)?.image} alt="feature img" />
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
