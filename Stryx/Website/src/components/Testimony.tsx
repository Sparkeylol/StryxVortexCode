import { h } from 'preact';

const Testimony = ({ user, quote, title }: {
  user: { name: string; };
  quote: string;
  title: string;
}): h.JSX.Element => (
  <div className="p-6 text-center">
    <p className="text-xl font-semibold">
      <q>{quote}</q>
    </p>
    <div className="flex justify-center mt-3 gap-3 items-center">
      <p className="font-bold text-lg">{user.name}</p>
      <p className="text-purple-600 text-3xl select-none">/</p>
      <p className="text-gray-700 font-medium text-md">{title}</p>
    </div>
  </div>
);

export default Testimony;
