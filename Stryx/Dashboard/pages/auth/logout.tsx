import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  signOut,
} from 'next-auth/client';
import Logo from '../../components/Logo';
import Discord from '../../components/icons/Discord';

export default function Login(): JSX.Element {
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
              <h1 className="font-bold text-3xl text-gray-900">LOGOUT</h1>
              <p>Thanks for visiting!</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    className="flex items-center justify-center w-full bg-indigo-500 transition duration-300 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    type="button"
                    onClick={() => {
                      signOut();
                      router.push('/auth/login');
                    }}
                  >
                    <span>Login</span>
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
