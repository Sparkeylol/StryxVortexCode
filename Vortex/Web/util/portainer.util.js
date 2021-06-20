const axios = require("axios").default

const uri = "http://170.39.231.141:9000"

class Portainer {
    constructor() {
        this.username = "website"
        this.password = "Vh73SwB5yc2NN4rmhzwxa8k2U8DY2c5A"
        this.apikey = null
    }

    async authenticate() {
        let jwt = await axios.post(uri+"/api/auth", {
          'Username': this.username,
          'Password': this.password
        });
        this.apikey = jwt.data.jwt;
      }

    async callApiWithKey(reqmethod, path, data) {
        if (this.apikey === null) {
            await this.authenticate()
        }
        let res = await axios.request({ method: reqmethod, url: uri+path, data: data, headers: { "Authorization": "Bearer "+this.apikey, "X-Registry-Auth": "eyJzZXJ2ZXJhZGRyZXNzIjoiIn0=" } })
        return res.data
    }
}

module.exports = Portainer