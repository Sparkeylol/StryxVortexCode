# Stryx Bot API
## Per-Region bot management

### Open endpoints
---
Open endpoints that require no authentication.
##### Hello, world: `ANY /v1`
This can be used to ping the server.
Expected result: ```{ "error": false, "message": "Hello, world!" }```

### Endpoints that require authentication
---
Closed endpoints require an authenticated token in order to access and use these endpoints.

#### Bot Related
Each endpoint displays or manipulates information related to a bot.
##### Get all bots: `GET /v1/bots`
Doesn't return settings as that would increase response time and length.
Expected Result:
```
[{
  "id": number,
  "clientId": string
}]
```

##### Get a single bot: `GET /v1/bots/{id}`
Expected Result:
```
{
  "id": number,
  "clientId": string,
  "settings": {
    prefix: string,
    modules: {
      fun: {
        economy: {
          currency: string
        },
        enabled: boolean
      },
      roblox: {
        cookie: string;
        enabled: boolean;
        groupId: number;
        sessions: {
          enabled: boolean;
        },
        verification: {
          enabled: boolean;
        }
      },
      logging: {
        channel: string;
      },
      tickets: {
        enabled: boolean;
        categories: string[];
        categoryId: string;
        logchannel: string;
      },
      utility: {
        enabled: boolean;
      }
    },
    statuses: {
      text: string;
      type: string;
    }[]
    constants: {
      colors: {
        info: string;
        error: string;
        default: string;
        success: string;
        warning: string;
      }
    },
    permissions: {
      dm: string[];
      ban: string[];
      close: string[];
      funds: string[];
      history: string[];
    },
    customCommands: {
        command: string;
        code: string;
    }[]
  }
}
```

##### Create a new bot on the node: `POST /v1/bots`
Bot must be created on the Database first.
Expected Body:
```
{
  "guildId": string
}
```
Expected Result:
```
{
  "error": false,
  "message": "OK"
}
```

##### Delete a bot from the node: `DELETE /v1/bots/{id}`
This only removes it from the node, which stops the bot. The data is still saved in the Database.
Expected Body:
```
{
  "clientId": string
}
```
Expected Result:
```
{
  "error": false,
  "message": "OK"
}
```
