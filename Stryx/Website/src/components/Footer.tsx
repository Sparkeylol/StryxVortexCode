import { h } from 'preact';
import Discord from './icons/Discord';
import Twitter from './icons/Twitter';
import Email from './icons/Email';
import Help from './icons/Help';

const links: {
  href: string;
  label: string;
}[] = [
  { href: '/', label: 'Home' },
  { href: 'https://help.stryx.cloud', label: "Help Center"},
  { href: 'https://dash.stryx.cloud', label: 'Dashboard' },
  { href: 'https://status.stryx.cloud', label: 'Status' },
  { href: 'https://help.stryx.cloud/en/articles/4919422-stryx-terms-and-conditions', label: 'Terms Of Service' },
  { href: 'https://help.stryx.cloud/en/articles/4919435-stryx-privacy-policy', label: 'Privacy Policy' },
  {href: 'https://server.stryx.cloud', label: 'Community Discord'}
];

const socials: {
  href: string;
  icon: h.JSX.Element;
  alt: string;
}[] = [
  {
    href: 'https://server.stryx.cloud',
    icon: <Discord />,
    alt: 'Discord',
  },
  {
    href: 'https://twitter.com/StryxServices',
    icon: <Twitter />,
    alt: 'Twitter',
  },
  {
    href: 'mailto:support@stryx.cloud',
    icon: <Email />,
    alt: 'Email',
  },
];

const Footer = (): h.JSX.Element => (
  <footer className="px-20 mt-10 pt-5 pb-24 bg-gray-900 text-gray-300">
    <div className="grid grid-rows-2 grid-cols-4 md:grid-rows-1 gap-3">
      <div className="col-span-3">
        <ul className="flex flex-col md:flex-row gap-2.5 mb-1">
          {links.map(({ href, label }) => (
            <li key={label}>
              <a
                className="text-indigo-400 hover:underline"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Copyright ©
          {` ${new Date().getFullYear()} `}
          Stryx. Made in the US.
        </p>
      </div>
      <div className="mb-2 md:float-right">
        <ul className="flex gap-2">
          <li>
            <button
              className="hover:text-indigo-500"
              onClick={() => (window as any).Intercom('showNewMessage', 'I have a question!')}
              target="_blank"
              rel="noreferrer"
              type="button"
              aria-label="Open Intercom"
            >
              <Help />
            </button>
          </li>
          {socials.map(({ icon, href, alt }) => (
            <li>
              <a
                className="hover:text-indigo-500"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={alt}
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
