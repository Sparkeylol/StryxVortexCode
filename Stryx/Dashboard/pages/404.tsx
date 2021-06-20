import Link from 'next/link';
import LogoOutline from '../components/LogoOutline';

export default function NotFound(): JSX.Element {
  return (
    <div>
      <div className="w-screen h-screen dark:bg-gray-900 bg-gray-100">
        <div className="flex w-full h-20 bg-indigo-600 items-center">
          <div className="flex w-full items-center px-12 py-4">
            <div className="flex-shrink-0 w-12 h-12">
              <Link href="/">
                <span className="cursor-pointer">
                  <LogoOutline />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-12 space-y-2">
          <h1 className="dark:text-white text-center font-bold text-8xl">404</h1>
          <h1 className="dark:text-white text-center font-bold text-4xl">It seems like you&apos;re lost.</h1>
        </div>
      </div>
    </div>
  );
}
