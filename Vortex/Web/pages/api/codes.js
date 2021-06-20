import { v4 as uuidv4 } from 'uuid';

import { codes } from '../../util/database.util'

var whitelist = ["05c132ff15b2772268acb80b61249e1103a94b95fe4586a801a650194a976e9b", "ROBLOX-6akW9TxGTXkbhggakBurX4fGMdSAC6FF"]

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.send({
        error: true,
        message: "Only POST to /api/codes"
    })
    if (!req.headers['authorization']) return res.send(JSON.stringify({
        error: true,
        body: "No Session Token."
    }))
    if (!whitelist.includes(req.headers['authorization'])) return res.send({
        error: true,
        body: "Unauthorized."
    })
    let monthly = []
    let semiannual = []
    let annual = []
    if (req.body.monthly) {
        for(var i=0; i < req.body.monthly; i++) {
            let code = uuidv4()
            monthly.push(code)
            await codes.create({
                code: code,
                months: 1
            })
        }
    }
    if (req.body.semiannual) {
        for(var i=0; i < req.body.semiannual; i++) {
            let code = uuidv4()
            semiannual.push(code)
            await codes.create({
                code: code,
                months: 6
            })
        }
    }
    if (req.body.annual) {
        for(var i=0; i < req.body.annual; i++) {
            let code = uuidv4()
            annual.push(code)
            await codes.create({
                code: code,
                months: 12
            })
        }
    }
    res.send({
        "monthly": monthly,
        "semiannual": semiannual,
        "annual": annual
    })
}