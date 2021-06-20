import { GetServerSideProps } from 'next';
import type { NextApiRequest } from 'next';
import jwt from 'next-auth/jwt';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { workspace } from '@prisma/client';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { JWTSession } from '../../api/auth/[...nextauth]';
import LogoOutline from '../../../components/LogoOutline';
import WorkspaceSelector from '../../../components/WorkspaceSelector';
import { getStripe } from '../../../lib/stripe-client';
import prisma from '../../../lib/prisma';
import Loading from '../../../components/animations/Loading';
import CheckBlacklisted from '../../../components/CheckBlacklisted';
import { trackEvent } from '@jackmerrill/next-intercom';

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

  const blacklisted = await CheckBlacklisted(token);

  return {
    props: { token, ws, blacklisted },
  };
};

export default function CreateWorkspacePage({ token, ws, blacklisted }: {
  token: JWTSession,
  ws: workspace[],
  blacklisted: boolean
}): JSX.Element {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
  });

  const handleCheckout = async (plan) => {
    try {
      setLoading(true);
      const res = await fetch('/api/checkout/create-session', {
        body: JSON.stringify({
          plan,
        }),
        method: 'POST',
        credentials: 'same-origin',
      });

      const { sessionId } = await res.json();
      const stripe = await getStripe();

      return stripe.redirectToCheckout({ sessionId });
    } catch (e) {
      setLoading(false);
      return new Error(e);
    }
  };

  if (router.query.session_id) {
    fetch(`${(process.env.NODE_ENV === 'production' ? 'https://dash.stryx.cloud' : 'http://localhost:3000')}/api/workspace/create`, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        session: router.query.session_id,
        name: `${token.user.username}'s Workspace`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (workspaceData) => {
      if (workspaceData.status !== 200) return new Error(workspaceData.statusText);
      const wd = await workspaceData.json();
      trackEvent('created-subscription', {
        plan_type: wd.subscription.plan.interval_count,
        expiration_date: wd.subscription.current_period_start,
        status: wd.subscription.status,
      });
      return router.push(`/workspace/${wd.workspace.workspaceId}/setup`);
    });
  }

  return (
    <div className="h-screen">
      {loading && (<AnimatePresence><Loading /></AnimatePresence>)}
      <div className="w-screen h-full dark:bg-gray-900 bg-gray-100">
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
              <WorkspaceSelector workspaces={ws} />
            </div>
          </div>
        </div>
        <div className="p-12 space-y-4">
          <h1 className="text-white font-extrabold text-center text-4xl">Pick a Plan.</h1>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-white rounded-xl w-80 p-8 space-y-4">
              <h2 className="text-gray-800 font-normal text-2xl">Monthly</h2>
              <h1 className="text-gray-800 font-extrabold text-6xl">
                $3
                <span className="text-2xl font-bold"> / mo</span>
              </h1>
              <button
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 w-full"
                type="button"
                onClick={() => handleCheckout('1')}
              >
                Buy
              </button>
            </div>
            <div className="bg-white rounded-xl w-80 p-8 space-y-4">
              <h2 className="text-gray-800 font-normal text-2xl">Semi-Annually</h2>
              <h1 className="text-gray-800 font-extrabold text-6xl">
                $9
                <span className="text-2xl font-bold"> / 6 mo</span>
              </h1>
              <button
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 w-full"
                type="button"
                onClick={() => handleCheckout('6')}
              >
                Buy
              </button>
            </div>
            <div className="bg-white rounded-xl w-80 p-8 space-y-4">
              <h2 className="text-gray-800 font-normal text-2xl">Annually</h2>
              <h1 className="text-gray-800 font-extrabold text-6xl">
                $15
                <span className="text-2xl font-bold"> / yr</span>
              </h1>
              <button
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 w-full"
                type="button"
                onClick={() => handleCheckout('12')}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
