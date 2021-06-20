/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetServerSideProps, NextApiRequest } from 'next';
import React, { useEffect } from 'react';
import jwt from 'next-auth/jwt';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { workspace } from '@prisma/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LogoOutline from '../../../../components/LogoOutline';
import WorkspaceSelector from '../../../../components/WorkspaceSelector';
import { JWTSession } from '../../../api/auth/[...nextauth]';
import prisma from '../../../../lib/prisma';
import CheckBlacklisted from '../../../../components/CheckBlacklisted';
import { updateIntercom } from '@jackmerrill/next-intercom';

const MySwal = withReactContent(Swal);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const r = context.req as NextApiRequest;
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

  const workspaces = await prisma.workspace.findMany({
    where: {
      members: {
        has: token.user.id,
      },
    },
  });

  const ws = [];

  workspaces.forEach((workspace) => {
    ws.push({
      workspaceId: workspace.workspaceId,
      workspaceName: workspace.workspaceName,
      members: workspace.members,
      plan_type: workspace.plan_type,
      expiresAt: workspace.expiresAt.toUTCString(),
    });
  });

  const workspace = await prisma.workspace.findFirst({
    where: {
      workspaceId: context.query.snowflake as string,
    },
  });

  const w = {
    workspaceId: workspace.workspaceId,
    workspaceName: workspace.workspaceName,
    members: workspace.members,
    plan_type: workspace.plan_type,
    expiresAt: workspace.expiresAt.toUTCString(),
  };

  const blacklisted = await CheckBlacklisted(token);

  return {
    props: {
      token, ws, blacklisted, w,
    },
  };

};

export default function IndexWorkspacePage({
  token, ws, w, blacklisted,
}: {
  token: JWTSession,
  ws: workspace[],
  w: workspace,
  blacklisted: boolean,
}): JSX.Element {
  const router = useRouter();

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
          to request an appeal or for more information.
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

    updateIntercom('update', {
      company: {
        id: w.workspaceId,

        people: w.members.length,

        plan: w.plan_type,

        paid: (w.plan_type === 0),

        website: `https://roblox.com/groups/${w.groupId}`
      }
    })
  });

  return (
    <div>
      <div className="h-screen dark:bg-gray-900 bg-gray-100">
        <div className="flex flex-col w-full h-64 bg-indigo-600 px-12 divide-y-2 divide-indigo-500">
          <div className="flex w-full h-20 items-center">
            <div className="flex w-full py-4">
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
                <WorkspaceSelector workspaces={ws} />
              </div>
            </div>
          </div>
          <div className="h-screen">
            <div className="flex flex-wrap -mx-2 overflow-hidden">
              <div className="my-2 px-2 w-full sm:w-full md:w-full lg:w-2/3 overflow-hidden">
                <div className="flex justify-around my-4 p-4 space-x-4">
                  <Link href={`/workspace/${router.query.snowflake}`} passHref>
                    <a className="text-white font-bold cursor-pointer">Dashboard</a>
                  </Link>
                  <Link href={`/workspace/${router.query.snowflake}/bot`} passHref>
                    <a className="text-white font-bold cursor-pointer">Bot Settings</a>
                  </Link>
                  <Link href={`/workspace/${router.query.snowflake}/settings`} passHref>
                    <a className="text-white font-bold cursor-pointer">Workspace Settings</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-2 overflow-hidden h-full">

              <div className="my-2 px-2 w-full sm:w-full md:w-full lg:w-2/3 overflow-hidden">
                <div className="w-full h-96 dark:bg-gray-800 bg-gray-50 rounded-xl p-4 pt-6 shadow-md">
                  <h1 className="text-gray-800 dark:text-white font-bold text-center text-3xl">
                    Welcome back to
                    {' '}
                    {w.workspaceName}
                    !
                  </h1>
                  <p className="text-gray-800 dark:text-white text-center text-2xl">Here&apos;s some data about your bot.</p>
                  <p className="text-gray-800 dark:text-white text-center text-2xl">@TODO: use chartjs lol</p>
                </div>
              </div>

              <div className="my-2 px-2 w-full sm:w-full md:w-full lg:w-1/3 overflow-hidden">
                <div className="w-full h-96 dark:bg-gray-800 bg-gray-50 rounded-xl p-4 pt-6 shadow-md">
                  <Link passHref href={`/workspace/${w.workspaceId}/bot`}>
                    <a
                      className="cursor-pointer inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 w-full"
                    >
                      Edit Bot Settings
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
