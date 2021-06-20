import { useRouter } from 'next/router';
import Logo from '../../components/Logo';

export default function Error(): JSX.Element {
  const router = useRouter();
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl">
        <div>
          <div className="py-10 px-6 md:px-12 justify-center">
            <div className="text-center mb-10">
              <div className="h-40 mb-10">
                <Logo />
              </div>
              <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
              <p>Welcome! We&apos;re so glad you&apos;re back!</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <h2 className="font-bold text-xl">Error signing you in:</h2>
                  <code>{router.query.error}</code>
                  <button
                    className="flex mt-4 items-center justify-center w-full bg-indigo-500 transition duration-300 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    type="button"
                    onClick={() => router.push('/auth/login')}
                  >
                    Return to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
