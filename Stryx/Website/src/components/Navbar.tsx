import { h } from 'preact';
import { useState } from 'preact/hooks';
import Logo from './Logo';

const Navbar = ({ links }: {
  links: {
    label: string;
    href: string;
  }[]
}): h.JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-700">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between md:w-auto  px-4 md:static md:block md:justify-start">
          <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
            <a href="/" aria-label="Stryx Logo">
              <div className="w-10 cursor-pointer">
                <Logo />
              </div>
            </a>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
            type="button"
            aria-label="Navigation Menu"
          >
            <span className="block relative w-6 h-px rounded-sm bg-white" />
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1" />
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1" />
          </button>
        </div>
        <div className={collapsed ? 'md:flex flex-grow items-center hidden' : 'md:flex flex-grow items-center'} id="navbar">
          <ul className="flex flex-col md:flex-row list-none ml-auto items-center">
            {links.map(({ label, href }) => (
              <li className="nav-item">
                <div className="px-3 py-2 flex items-center leading-snug text-white">
                  <a
                    className="font-medium text-gray-200 hover:underline"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {label}
                  </a>
                </div>
              </li>
            ))}
            <li className="nav-item">
              <button
                disabled
                type="button"
                className="opacity-50 bg-gray-800 text-white rounded-md px-4 py-2 m-2 select-none items-center cursor-default"
              >
                Coming Soon
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
