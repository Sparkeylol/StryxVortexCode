import { h } from 'preact';

const Hero = (): h.JSX.Element => (
  <div
    className="flex bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700 py-20 justify-center"
    id="hero"
  >
    <div className="p-8 text-center text-white max-w-2xl">
      <span className="text-3xl font-bold">Reinventing Bots on Discord</span>
      <p className="text-xl font-normal mt-4">
        Stryx hosts custom Discord bots for the Roblox Community.
      </p>
    </div>
  </div>
);

export default Hero;
