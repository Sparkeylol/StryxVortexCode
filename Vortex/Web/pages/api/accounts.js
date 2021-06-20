const db = require('../../util/database.util')

const users = db.users
const accounts = db.accounts
const sessions = db.sessions

export default function handler(req, res) {
  if (req.method === 'POST') {
    users.findOne({ email: req.body.email }, async function (err, user) {
      if (!req.headers['authorization']) return res.end(JSON.stringify({
        error: true,
        body: "No Session Token."
      }))
        const session = await sessions.findOne({ accessToken: req.headers['authorization'] }).exec();

        if (session.userId.toString() !== user._id.toString()) return res.end(JSON.stringify({
          error: true,
          body: "Session Token Invalid."
        }))
        
        const account = await accounts.findOne({ userId: user._id }).exec();
        
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          error: false,
          body: account
        }))
    })
  } else {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      error: true,
      body: "Only POST to /api/accounts"
    }))
  }
}