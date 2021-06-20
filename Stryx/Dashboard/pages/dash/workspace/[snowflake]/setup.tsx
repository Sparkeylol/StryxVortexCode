import { GetServerSideProps, NextApiRequest } from 'next';
import React, { useEffect, useState } from 'react';
import jwt from 'next-auth/jwt';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { workspace } from '@prisma/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { trackEvent } from '@jackmerrill/next-intercom';
import LogoOutline from '../../../../components/LogoOutline';
import WorkspaceSelector from '../../../../components/WorkspaceSelector';
import { JWTSession } from '../../../api/auth/[...nextauth]';
import prisma from '../../../../lib/prisma';
import CheckBlacklisted from '../../../../components/CheckBlacklisted';

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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function SetupWorkspacePage({
  token, ws, blacklisted, w,
}: {
  token: JWTSession,
  ws: workspace[],
  blacklisted: boolean,
  w: workspace,
}): JSX.Element {
  const [modules, setModules] = useState([]);
  const router = useRouter();

  const mods = ['fun', 'moderation', 'roblox', 'sessions', 'tickets', 'utility', 'verification'];

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

  async function UpdateWorkspace(workspaceName: string, groupId: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      fetch(`/api/workspace/${router.query.snowflake}`, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          workspaceName,
          groupId,
        }),
      }).then(async (resp) => {
        const json = (await resp.json());
        if (resp.status !== 200) reject(new Error('nah'));
        if (json.error) reject(new Error(json.message));
        resolve(resp);
      });
    });
  }

  async function CreateBot(event): Promise<Response> {
    return new Promise((resolve, reject) => {
      fetch(`/api/servers/${event.target.guildId.value}`, {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          settings: {
            prefix: '-',
            modules: {
              fun: {
                enabled: event.target.modulefun.checked,
                economy: {
                  currency: '$',
                },
              },
              roblox: {
                enabled: event.target.moduleroblox.checked,
                cookie: '',
                groupId: '',
                sessions: {
                  enabled: event.target.modulesessions.checked,
                },
                verification: {
                  enabled: event.target.moduleverification.checked,
                },
              },
              logging: {
                channel: '',
              },
              tickets: {
                enabled: event.target.moduletickets.checked,
                categories: [],
                categoryId: '',
                logchannel: '',
              },
              utility: {
                enabled: event.target.moduleutility.checked,
              },
            },
            statuses: [
              {
                text: '',
                type: '',
              },
              {
                text: '',
                type: '',
              },
              {
                text: '',
                type: '',
              },
            ],
            constants: {
              colors: {
                info: 'CYAN',
                error: 'RED',
                default: '#731DD8',
                success: 'GREEN',
                warning: 'YELLOW',
              },
            },
            permissions: {
              ban: '',
              close: '',
            },
            customCommands: [],
          },
          botToken: event.target.botToken.value,
          guildId: event.target.guildId.value,
          botOwner: router.query.snowflake,
        }),
      }).then(async (resp) => {
        const json = (await resp.json());
        if (resp.status !== 200) reject(new Error('nah'));
        if (json.error) reject(new Error(json.message));
        try {
          await UpdateWorkspace(event.target.workspaceName.value, event.target.groupId.value);
          resolve(resp);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  return (
    <div>
      <div className="dark:bg-gray-900 bg-gray-100">
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
        <div className="w-full p-12 space-y-2">
          <h1 className="text-white text-4xl font-bold">Initial Setup</h1>
          <h2 className="text-white text-3xl font-bold">Workspace Setup</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            console.log(w);

            toast.promise(CreateBot(e), {
              loading: 'Saving...',
              success: 'Saved!',
              error: 'Error',
            }).then(async (res: Response) => {
              if (res.ok) {
                await router.push(`/workspace/${router.query.snowflake}`);
              }
            });
          }}

          >
            <div className="w-full my-5">
              <label htmlFor="workspaceName" className="text-xl font-semibold px-1 text-white">
                Workspace Name
                <div className="flex">
                  <input id="workspaceName" required name="workspaceName" defaultValue={`${token.user.username}'s Workspace`} type="text" className="w-full px-2 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-gray-900" placeholder="..." />
                </div>
              </label>
            </div>
            <div className="w-full my-5">
              <label htmlFor="workspaceName" className="text-xl font-semibold px-1 text-white">
                Roblox Group ID
                <div className="flex">
                  <input id="groupId" required name="groupId" type="text" className="w-full px-2 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-gray-900" placeholder="..." />
                </div>
              </label>
            </div>
            <h2 className="text-white text-3xl font-bold">Bot Setup</h2>
            <div className="w-full my-5">
              <label htmlFor="botToken" className="text-xl font-semibold px-1 text-white">
                Bot Token
                <div className="flex">
                  <input id="botToken" required name="botToken" type="text" className="w-full px-2 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-gray-900" placeholder="..." />
                </div>
              </label>
            </div>
            <div className="w-full my-5">
              <label htmlFor="botToken" className="text-xl font-semibold px-1 text-white">
                Guild ID
                <div className="flex">
                  <input id="guildId" required name="guildId" type="text" className="w-full px-2 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-gray-900" placeholder="..." />
                </div>
              </label>
            </div>
            <div className="w-full my-5">
              <label htmlFor="botToken" className="text-xl font-semibold px-1 text-white">
                Bot Modules
                <div className="flex flex-col">
                  {mods.map((mod) => (
                    <label htmlFor={`module${mod}`} className="inline-flex items-center mt-3">
                      <input
                        type="checkbox"
                        id={`module${mod}`}
                        name={`module${mod}`}
                        key={`module${mod}`}
                        className="form-checkbox h-5 w-5 text-indigo-600 rounded-md transition duration-200"
                        defaultChecked
                        onChange={(e) => {
                          if (e.target.value === 'on') {
                            modules.push(mod);
                            setModules(modules);
                          } else {
                            modules.splice(modules.indexOf(mod), 1);
                            setModules(modules);
                          }
                        }}
                      />
                      <span className="ml-2 text-white font-bold">{capitalizeFirstLetter(mod)}</span>
                    </label>
                  ))}
                </div>
              </label>
              <button
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 w-full"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}
