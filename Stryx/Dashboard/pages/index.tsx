import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Discord from '../components/icons/Discord';

// const FeaturedPartners: {
//   logo: string,
//   groupName: string,
// }[] = [

// ];

export default function Homepage(): JSX.Element {
  const [plan, setPlan] = useState<'monthly' | 'biannual' | 'annual'>('monthly');


  return (


    <div>
      <div className="w-full h-full min-h-screen dark:bg-gray-900 bg-gray-100">
        <Navbar />
        <main className="bg-black text-gray-200 font-medium">
          <div className="py-12 md:py-24 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-8 xl:px-4 grid md:grid-cols-4 xl:grid-cols-5 gap-x-12 lg:gap-x-20">
              <div className="order-2 md:order-1 col-span-2 self-center mt-12 md:mt-0">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 lg:mb-8">The best Roblox Group Management solution.</h1>
                <p className="text-lg xl:text-xl text-gray-200 mb-6 lg:mb-8 xl:mb-10">Level up your group&apos;s professionalism and customization with Stryx.</p>
                <button
                  type="button"
                  className="focus:outline-none inline-flex gap-4 items-center transition transform duration-300 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-700 font-semibold rounded-lg py-4 px-5 w-5/6 text-white"
                >
                  <Discord />
                  Get Started for Free Today
                </button>
              </div>
              <div className="order-1 md:order-2 col-span-2 xl:col-span-3">
                <img src="./images/hero-image-dark.png" className="rounded-lg shadow-2xl" alt="" />
              </div>
            </div>
          </div>

          <div className="py-12 lg:pb-16 bg-black mb-12 lg:mb-16  ">
            <h4 className="text-gray-400 font-semibold text-center">Statistics</h4>
            <div className="max-w-screen-xl mx-auto px-6 lg:px-8 xl:px-4 grid grid-cols-2 sm:grid-cols-3 space-y-5 space-x-5 sm:space-y-3 xl:grid-cols-6 col-gap-6 opacity-95">
              <div className="h-10 p-1 self-end justify-self-center text-center">
                <h1 className="text-white font-extrabold text-4xl">Bots</h1>
                <h5 className="text-white font-bold text-2xl">69</h5>
              </div>
              <div className="h-10 p-1 self-end justify-self-center text-center">
                <h1 className="text-white font-extrabold text-4xl">Total Members</h1>
                <h5 className="text-white font-bold text-2xl">69420</h5>
              </div>
              <div className="h-10 p-1 self-end justify-self-center text-center">
                <h1 className="text-white font-extrabold text-4xl">Member Counters</h1>
                <h5 className="text-white font-bold text-2xl">420</h5>
              </div>
              <div className="h-10 p-1 self-end justify-self-center text-center">
                <h1 className="text-white font-extrabold text-4xl">Workspaces</h1>
                <h5 className="text-white font-bold text-2xl">42</h5>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-8 xl:px-4 pb-12 lg:pb-16 xl:pb-24">
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">By Players, for Players.</h2>
                <p className="text-lg xl:text-xl text-gray-200">We offer a 100% money back guarantee.</p>
              </div>

              <div className="flex justify-center mb-8 md:mb-20 lg:mb-24">
                <nav className="inline-flex bg-indigo-100 rounded-lg overflow-hidden text-sm">
                  <button type="button" onClick={() => setPlan('monthly')} className={`font-bold focus:outline-none py-3 px-6 ${plan === 'monthly' ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-700 text-white' : 'text-indigo-500 hover:bg-indigo-50'}`}>Pay Monthly</button>
                  <button type="button" onClick={() => setPlan('biannual')} className={`font-bold focus:outline-none py-3 px-6 ${plan === 'biannual' ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-700 text-white' : 'text-indigo-500 hover:bg-indigo-50'}`}>Pay Bi-annually</button>
                  <button type="button" onClick={() => setPlan('annual')} className={`font-bold focus:outline-none py-3 px-6 ${plan === 'annual' ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-700 text-white' : 'text-indigo-500 hover:bg-indigo-50'}`}>Pay Annually</button>
                </nav>
              </div>

              <div className="grid md:grid-cols-3 gap-x-8 gap-y-8 items-start">
                <div className="p-4 md:p-8  rounded-lg bg-gray-900">
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-xl lg:text-2xl font-bold">Free Workspace</h4>
                    <span className="text-xl lg:text-2xl font-bold">$0</span>
                  </div>
                  <p className="text-gray-200 mb-6 text-lg">Best for new or small groups.</p>
                  <a href="/" className="border border-gray-700 rounded-lg block text-center py-3 px-5 lg:px-8 font-bold mb-8 bg-gradient-to-br hover:from-indigo-500 hover:to-indigo-700 hover:text-white">Start for free</a>
                  <ul className="text-gray-200 space-y-4 text-lg">
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>50 Weekly Applications</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>5 workspace members</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Basic Support</span>
                    </li>
                    <li className="flex space-x-2 items-center opacity-25">
                      <div className="w-6 h-6">
                        &nbsp;
                      </div>
                      <span>Discord Bot Included</span>
                    </li>
                    <li className="flex space-x-2 items-center opacity-25">
                      <div className="w-6 h-6">
                        &nbsp;
                      </div>
                      <span>Booster API</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 md:p-8 lg:py-12 md:transform md:-translate-y-10 md:-mb-10 bg-gray-900 rounded-lg md:shadow-md md:hover:shadow-xl md:transition-all md:duration-500 border-2 md:border border-black">
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-xl lg:text-2xl font-bold">Premium Workspace</h4>
                    {/* fuck off eslint :) */}
                    {/* eslint-disable-next-line no-nested-ternary */}
                    <span className="text-xl lg:text-2xl font-bold">{plan === 'monthly' ? '$3' : (plan === 'biannual' ? '$9' : '$15')}</span>
                  </div>
                  <p className="text-gray-200 mb-6 text-lg">Recommended for medium to large groups.</p>
                  <Link href="/dash/workspace/create" passHref>
                    <a href="/dash/workspace/create" className="border border-gray-700 rounded-lg block text-center py-3 px-5 lg:px-8 font-bold bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-700  text-white mb-8">Get Started</a>
                  </Link>
                  <ul className="text-gray-200 space-y-4 text-lg">
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Unlimited Weekly Applications</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Unlimited Workspace Members</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Prioritized Support</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Discord Bot Included</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>In-Game Moderation Panel</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 md:p-8  rounded-lg bg-gray-900">
                  <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-xl lg:text-2xl font-bold">Custom Workspace</h4>
                    <span className="text-xl lg:text-xl font-bold">Contact Us</span>
                  </div>
                  <p className="text-gray-200 mb-6 text-lg">Recommended for Megagroups.</p>
                  <a href="/" className="border border-gray-700 rounded-lg block text-center py-3 px-5 lg:px-8 font-bold mb-8 bg-gradient-to-br hover:from-indigo-500 hover:to-indigo-700 hover:text-white" onClick={() => (window as any).Intercom('showNewMessage', "I'm interested in a custom bot!")}>Contact Us</a>
                  <ul className="text-gray-200 space-y-4 text-lg">
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Unlimited Weekly Applications</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Unlimited Workspace Members</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>Custom Discord Bot</span>
                    </li>
                    <li className="flex space-x-2 items-center">
                      <div className="w-6 h-6">
                        <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span>60-day history</span>
                    </li>
                    <li className="flex space-x-2 items-center opacity-25">
                      <div className="w-6 h-6">
                        &nbsp;
                      </div>
                      <span>Higher Priority Support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
