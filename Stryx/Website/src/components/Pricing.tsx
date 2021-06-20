/* eslint-disable max-len */
import { h } from 'preact';
import Box from './icons/Box';
import Check from './icons/Check';
import Cloud from './icons/Cloud';
import X from './icons/X';

const publicBotFeatures: {
  text: string,
  subtext?: string,
  icon: h.JSX.Element,
}[] = [
  {
    text: 'Roblox Verification',
    subtext: 'Powered by BloxLink',
    icon: <Check />,
  },
  {
    text: 'Full Moderation Suite',
    icon: <Check />,
  },
  {
    text: 'Utility Commands',
    icon: <Check />,
  },
  {
    text: 'Dashboard',
    icon: <X />,
  },
];

const premiumBotFeatures: {
  text: string,
  subtext?: string,
  icon: h.JSX.Element,
}[] = [
  {
    text: 'All Previous Features',
    icon: <Check />,
  },
  {
    text: 'Dashboard',
    icon: <Check />,
  },
  {
    text: 'Group Ranking Commands',
    icon: <Check />,
  },
  {
    text: 'Group Management Commands',
    icon: <Check />,
  },
  {
    text: 'Ticket / ModMail system',
    icon: <Check />,
  },
];

// const customBotFeatures: {
//   text: string,
//   subtext?: string,
//   icon: h.JSX.Element,
// }[] = [
//   {
//     text: 'All Previous Features',
//     icon: <Check />,
//   },
//   {
//     text: 'Dedicated Account Manager',
//     icon: <Check />,
//   },
//   {
//     text: 'Prioritized Support',
//     icon: <Check />,
//   },
//   {
//     text: 'Custom Role in our Discord',
//     icon: <Check />,
//   },
//   {
//     text: 'Any modifications you may like.',
//     icon: <Check />,
//   },
// ];

const PricingComponent = (): h.JSX.Element => (
  <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
    <div className="max-w-xl mb-5 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
        <span className="relative inline-block">
          <span className="relative">Transparent</span>
        </span>
        {' '}
        pricing that fulfills your needs.
      </h2>
      <p className="text-base text-gray-700 md:text-lg">
        We charge you a fair price for our services.
      </p>
    </div>
    <div className="grid max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-lg lg:grid-cols-2 sm:mx-auto">
      <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between pb-6 mb-6 border-b">
            <div>
              <p className="text-sm font-bold tracking-wider uppercase">
                Public Bot
              </p>
              <p className="text-5xl font-extrabold">Free</p>
            </div>
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50">
              <Box />
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold tracking-wide">Features</p>
            <ul className="space-y-2">
              {publicBotFeatures.map(({ text, subtext, icon }) => (
                <li className="flex items-center">
                  <div className="mr-2">
                    {icon}
                  </div>
                  <p className="font-medium text-gray-800">
                    {text}
                    {subtext && (
                      <p className="text-xs font-light tracking-wider uppercase">
                        {subtext}
                      </p>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            className="opacity-50 justify-center w-full h-12 px-6 mb-4 font-bold text-white transition duration-200 bg-gray-800 rounded shadow-md focus:shadow-outline focus:outline-none cursor-default"
            disabled
            type="button"
          >
            Coming Soon
          </button>
          <p className="text-sm text-gray-600">
            This bot is free of charge, but has less features than our custom branded bot.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
        <div className="mb-6">
          <div className="flex items-center justify-between pb-6 mb-6 border-b">
            <div>
              <p className="text-sm font-bold tracking-wider uppercase">
                Premium Bot
              </p>
              <p className="text-5xl font-extrabold">$3</p>
              <p className="text-base font-semibold pt-2">$10 for 6 months - $15 for 12 months.</p>
              <p className="text-base text-gray-700 md:text-lg">
                per month
              </p>
            </div>
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50">
              <Cloud />
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold tracking-wide">Features</p>
            <ul className="space-y-2">
              {premiumBotFeatures.map(({ text, subtext, icon }) => (
                <li className="flex items-center">
                  <div className="mr-2">
                    {icon}
                  </div>
                  <p className="font-medium text-gray-800">
                    {text}
                    {subtext && (
                    <p className="text-xs font-light tracking-wider uppercase">
                      {subtext}
                    </p>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            className="opacity-50 justify-center w-full h-12 px-6 mb-4 font-bold text-white transition duration-200 bg-gray-800 rounded shadow-md focus:shadow-outline focus:outline-none cursor-default"
            disabled
            type="button"
          >
            Coming Soon
          </button>
          <p className="text-sm text-gray-600">
            This bot has Stryx branding, and can be removed with a one-time fee of $15.
          </p>
        </div>
      </div>
      {/* <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between pb-6 mb-6 border-b">
            <div>
              <p className="text-sm font-bold tracking-wider uppercase">
                Custom Bot
              </p>
              <p className="text-4xl font-extrabold">Contact Us</p>
            </div>
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50">
              <Cloud />
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold tracking-wide">Features</p>
            <ul className="space-y-2">
              {customBotFeatures.map(({ text, subtext, icon }) => (
                <li className="flex items-center">
                  <div className="mr-2">
                    {icon}
                  </div>
                  <p className="font-medium text-gray-800">
                    {text}
                    {subtext && (
                      <p className="text-xs font-light tracking-wider uppercase">
                        {subtext}
                      </p>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            className="justify-center w-full h-12 px-6 mb-4 font-bold text-white transition duration-200 bg-indigo-600 hover:bg-indigo-700 rounded shadow-md focus:shadow-outline focus:outline-none cursor-point"
            type="button"
          >
            Contact Us
          </button>
          <p className="text-sm text-gray-600">
            This bot has no branding. Go and have fun with your custom bot!
          </p>
        </div>
      </div> */}
    </div>
  </div>
);

export default PricingComponent;
