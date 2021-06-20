import Link from 'next/link';
import { useEffect, useState } from 'react';
import LogoOutline from './LogoOutline';

const Navbar = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-2 py-4 navbar-expand-lg bg-gray-900">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between ">
        <div className="w-full relative flex justify-between md:w-auto px-4 md:static md:block md:justify-start items-center">
          <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white">
            <Link href="/" passHref>
              <a href="/" className="w-12h-12">
                <LogoOutline />
              </a>
            </Link>
          </div>
          <button type="button" className="md:hidden text-gray-500 w-10 h-10 relative focus:outline-none" onClick={() => setCollapsed(!collapsed)}>
            <span className="sr-only">Open menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out bg-white ${!collapsed ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out bg-white ${!collapsed && 'opacity-0'}`} />
              <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out bg-white ${!collapsed ? '-rotate-45' : 'translate-y-1.5'}`} />
            </div>
          </button>
        </div>
        <div className={collapsed ? 'md:flex flex-grow items-center hidden' : 'md:flex flex-grow items-center'} id="navbar">
          <ul className="flex flex-col md:flex-row list-none ml-auto items-center">
            <li className="nav-item">
              <div className="px-3 py-2 flex items-center leading-snug text-white">
                <Link href="/" passHref>
                  <a
                    className="font-bold text-gray-200 hover:underline"
                    href="/"
                  >
                    Home
                  </a>
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="px-3 py-2 flex items-center leading-snug text-white">
                <Link href="/pricing" passHref>
                  <a
                    className="font-bold text-gray-200 hover:underline"
                    href="/"
                  >
                    Pricing
                  </a>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
