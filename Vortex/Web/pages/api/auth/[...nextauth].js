// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE || 'http://localhost:3000',

  // Configure one or more authentication providers
  providers: [
    // Providers.Discord({
    //     scopes: '',
    //     clientId: process.env.DISCORD_CLIENT_ID,
    //     clientSecret: process.env.DISCORD_CLIENT_SECRET
    // }),
    {
      id: 'discord',
      name: 'Discord',
      type: 'oauth',
      version: '2.0',
      scope: 'identify email guilds',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://discord.com/api/oauth2/token',
      authorizationUrl: 'https://discord.com/api/oauth2/authorize?response_type=code&prompt=none',
      profileUrl: 'https://discord.com/api/users/@me',
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      profile: (profile) => {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
        } else {
          const format = profile.premium_type === 1 || profile.premium_type === 2 ? 'gif' : 'png'
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
        }
        return {
          id: profile.id,
          name: profile.username,
          image: profile.image_url,
          email: profile.email
        }
      }
    }
  ],

  secret: process.env.SECRET_KEY,

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);