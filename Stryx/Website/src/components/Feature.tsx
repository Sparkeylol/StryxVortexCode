import { h } from 'preact';

const Feature = ({ title, description, right }: {
  title: string;
  description: string;
  right: boolean;
}): h.JSX.Element => (
  <div className={`
    max-w-6xl mx-auto my-5 flex
    ${right ? 'bg-gray-200' : 'bg-white'}
    ${right ? 'justify-start' : 'justify-end'}
  `}>
    <div className="py-8 px-20 grid grid-cols-5">
      <div className="col-span-4">
        <span className="font-bold text-xl mb-3">{title}</span>
        <p className="text-gray-600 max-w-lg">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default Feature;
