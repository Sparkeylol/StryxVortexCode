import { FunctionalComponent, h } from 'preact';
import CallToAction from '../components/CallToAction';
import Feature from '../components/Feature';
import Comparison from '../components/Comparison';
import PricingComponent from '../components/Pricing';
import Testimony from '../components/Testimony';

const features: {
  title: string;
  description: string;
}[] = [
  {
    title: 'Group Management',
    description: 'Control your Roblox group with our simple bot commands!',
  },
  {
    title: 'Verification',
    description: 'Our bot connects your Roblox and Discord accounts, creating a seamless link between the two.',
  },
  {
    title: 'Ranking',
    description: 'Rank your group members easily with our system!',
  },
  {
    title: 'Sessions',
    description: 'Log your group\'s sessions with ease.',
  },
  {
    title: 'Ticketing System',
    description: 'Manage your support tickets with ease.',
  },
  {
    title: 'Moderation',
    description: 'A full moderation suite, baked into our bot.',
  },
  {
    title: 'Suggestions',
    description: 'Allow users to submit suggestions for your group!',
  },
  {
    title: 'Math',
    description: 'Quickly calculate equations using our bot!',
  },
];

const Home: FunctionalComponent = (): h.JSX.Element => (
  <div>
    <section
      id="testimonies"
      className="grid grid-cols-1 md:grid-cols-2"
    >
      <Testimony
        user={{ name: 'Dqnzx' }}
        quote="So far excellent, all commands work fine. Worth the price. Ranking also works very well and bot also has great uptime."
        title="Custom Bot Owner"
      />
      <Testimony
        user={{ name: 'TheRealStraycat' }}
        quote="My experience with this service is absolutely amazing! With a fully custom bot, you can bring professionality to a whole new level! This service provides excellent support and features, which makes everything easier."
        title="Custom Bot Owner"
      />
    </section>
    <CallToAction />
    <section id="features">
      {features.map(({ title, description }, i) => (
        <Feature
          title={title}
          description={description}
          right={i % 2 === 0}
        />
      ))}
    </section>
    <section id="pricing">
      <PricingComponent />
      <p className="text-center font-bold mb-5">
        Have any questions?
        {' '}
        <button
          type="button"
          className="text-blue-600"
          onClick={() => (window as any).Intercom('showNewMessage', 'I have a question regading pricing!')}>
          Talk to us!
        </button>
      </p>
    </section>
    <section id="comparison" className="text-center">
      <h1 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto py-0">How we&apos;re different</h1>
      <p className="text-2xl font-normal pt-1 pb-5">Stryx offers a competitive advantage, at a low price.</p>
      <div className="flex justify-center">
        <Comparison />
      </div>
    </section>
  </div>
);

export default Home;
