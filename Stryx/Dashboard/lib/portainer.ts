import axios, { Method } from 'axios';

const uri = '';

class Portainer {
  username: string;

  password: string;

  apikey: any;

  constructor() {
    this.username = '';
    this.password = '';
    this.apikey = null;
  }

  async authenticate() {
    const jwt = await axios.post(`${uri}/api/auth`, {
      Username: this.username,
      Password: this.password,
    });
    this.apikey = jwt.data.jwt;
  }

  // shut up typescript this works
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async callApiWithKey(reqmethod: Method, path: string, dataToSend: any): any {
    if (this.apikey === null) {
      await this.authenticate();
    }
    const { data } = await axios.request({
      method: reqmethod, url: uri + path, data: dataToSend, headers: { Authorization: `Bearer ${this.apikey}`, 'X-Registry-Auth': 'eyJzZXJ2ZXJhZGRyZXNzIjoiIn0=' },
    });
    return data;
  }
}

export default Portainer;
