require('dotenv').config();
const fetch = require('node-fetch').default;
const { verifyKey } = require('discord-interactions');

function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    console.log(signature, timestamp, clientKey);

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
}

async function DiscordRequest(endpoint, options) {
  const url = 'https://discord.com/api/v10/' + endpoint;
  if (options.body) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.Charlotte_Token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent':
        'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  return res;
}

async function InstallGlobalCommands(appId, commands) {
  const endpoint = `applications/${appId}/commands`;
  try {
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getServerLeaderboard(guildId) {
  let members = await getServerMembers(guildId, 3);
  members = members
    .map((id, i) => `${i + 1}. <@${id}> (\`${getFakeUsername(i)}\`)`)
    .join('\n');
  return `## :trophy: Server Leaderboard\n*This is a very fake leaderboard that just pulls random server members. Pretend it's pulling real game data and it's much more fun* :zany_face:\n\n### This week\n${members}\n\n### All time\n${members}`;
}

async function getServerMembers(guildId, limit) {
  const endpoint = `guilds/${guildId}/members?limit=${limit}`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const parsedRes = await res.json();
    return parsedRes.map((member) => member.user.id);
  } catch (err) {
    return console.error(err);
  }
}

function createPlayerEmbed(profile) {
  return {
    type: 'rich',
    title: `${profile.username} Profile (lvl ${profile.stats.level})`,
    color: 0x968b9f,
    fields: [
      {
        name: `Account created`,
        value: profile.createdAt,
        inline: true,
      },
      {
        name: `Last played`,
        value: profile.lastPlayed,
        inline: true,
      },
      {
        name: `Global rank`,
        value: profile.stats.rank,
        inline: true,
      },
      {
        name: `Combat stats`,
        value: `:smiley: ${profile.stats.wins} wins / :pensive: ${profile.stats.losses} losses`,
      },
      {
        name: `Realms explored`,
        value: profile.stats.realms,
        inline: true,
      },
    ],
    url: 'https://discord.com/developers/docs/intro',
    thumbnail: {
      url: 'https://raw.githubusercontent.com/shaydewael/example-app/main/assets/fake-icon.png',
    },
  };
}

module.exports = {
  VerifyDiscordRequest,
  DiscordRequest,
  InstallGlobalCommands,
  capitalize,
  getServerLeaderboard,
  createPlayerEmbed,
};
