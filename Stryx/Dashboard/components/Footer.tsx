import { useTheme } from 'next-themes';

const Footer = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  return (
    <footer>
      <div className="flex flex-col bg-gray-50 dark:bg-gray-800 justify-center items-center">
        <p className="text-center text-black dark:text-white font-bold text-lg">
          Made with
          <span role="img" aria-label="heart-emoji">❤️</span>
          {' '}
          by Stryx Developers
        </p>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-48 inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        >
          Toggle Dark Mode
        </button>
      </div>
    </footer>
  );
};

export default Footer;
