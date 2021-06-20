import { GetServerSideProps } from 'next';
import type { NextApiRequest } from 'next';
import jwt from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { workspace } from '@prisma/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getLogo } from 'noblox.js';
import { JWTSession } from '../api/auth/[...nextauth]';
import LogoOutline from '../../components/LogoOutline';
import WorkspaceSelector from '../../components/WorkspaceSelector';
import prisma from '../../lib/prisma';
import CheckBlacklisted from '../../components/CheckBlacklisted';

const MySwal = withReactContent(Swal);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const r = req as NextApiRequest;
  const token = await jwt.getToken({
    req: r,
    secret: process.env.JWT_SECRET,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    signingKey: process.env.JWT_SIGNING_KEY,
  }) as JWTSession;

  if (!token || token === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  let workspaces = null;

  if (token || token !== null) {
    workspaces = await prisma.workspace.findMany({
      where: {
        members: {
          has: token.user.id,
        },
      },
    });
  }

  const ws = [];

  await workspaces.forEach(async (w: workspace) => {
    const wsLogo = await getLogo(parseInt(w.groupId, 10));
    ws.push({
      workspaceId: w.workspaceId,
      workspaceName: w.workspaceName,
      members: w.members,
      plan_type: w.plan_type,
      expiresAt: w.expiresAt.toUTCString(),
      logo: wsLogo,
    });
  });

  const blacklisted = await CheckBlacklisted(token);

  return {
    props: { token, ws, blacklisted },
  };
};

function WorkspaceCard({ workspaceInfo }: {
  workspaceInfo: workspace & {logo: string}
}): JSX.Element {
  console.log(workspaceInfo)
  return (
    <Link href={`/workspaces/${workspaceInfo.workspaceId}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <div className="flex flex-wrap dark:bg-white w-96 h-36 rounded-xl p-4 text-center">
          <div className="w-16">
            <img alt={`${workspaceInfo.workspaceName} Logo`} src={workspaceInfo.logo} width="64" height="64" className="rounded-xl" />
          </div>
          <h1>{workspaceInfo.workspaceName}</h1>
        </div>
      </a>
    </Link>
  );
}

export default function Home({ token, ws, blacklisted }: {
  token: JWTSession,
  ws: Array<workspace & {logo: string}> | null,
  blacklisted: boolean
}): JSX.Element {
  console.log(ws)
  const router = useRouter();

  const [userMenuOpen, setUserMenu] = useState(false);

  const [workspacesLoaded, setWorkspacesLoaded] = useState(false);

  useEffect(() => {
    if (!token || token === null) {
      router.push('/auth/login');
    }
    if (blacklisted) {
      MySwal.fire({
        title: 'Uh oh!',
        html: <p>
          It seems your account is blacklisted from using our services.
          Please open a support ticket within our live chat or email us at
          {' '}
          <code>support@stryx.cloud</code>
          {' '}
          to request an appeal.
        </p>,
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showDenyButton: false,
        showCancelButton: false,
      });
    }
    console.log(ws)
    setWorkspacesLoaded(true);
  });

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
          <div className="md:block">
            <div className="flex justify-center pr-12 w-64">
              <div className="flex justify-center p-12">
                <div className="relative">
                  <button type="button" className="block h-12 w-12 rounded-full overflow-hidden focus:outline-none" onClick={() => setUserMenu(!userMenuOpen)}>
                    <Image
                      src={`https://cdn.discordapp.com/avatars/${token.user.id}/${token.user.avatar}`}
                      alt="User Avatar"
                      width="48"
                      height="48"
                      className="rounded-full ml-4"
                    />
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="absolute right-0 w-40 mt-2 py-2 bg-white border rounded shadow-xl">
                        <Link href="/settings" passHref>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">Settings</a>
                        </Link>
                        <div className="py-2">
                          <hr />
                        </div>
                        <Link href="/auth/logout" passHref>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a href="#" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-purple-500 hover:text-white">
                            Logout
                          </a>
                        </Link>
                      </div>

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-12 space-y-2">
          <h1 className="dark:text-white font-extrabold text-4xl inline-flex content-center items-center">
            Welcome back,
            {' '}
            {token.user.username}
            !
          </h1>
          <h2 className="dark:text-white font-bold text-2xl">Here&apos;s your current workspaces:</h2>
          <div className="flex flex-row space-x-5">
            {workspacesLoaded && ws.map((workspace) => (
              <WorkspaceCard workspaceInfo={workspace} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
