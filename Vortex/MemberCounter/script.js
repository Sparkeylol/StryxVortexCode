const axios = require('axios')
const membercounter = require('./util/database.util').membercounter
const figlet = require('figlet')

String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}

function check() {
    membercounter.find((err, documents) => {
        if (err) return console.log(err)
        documents.forEach(async (doc, i) => {
            setTimeout(async function() {
                let response = await axios.get(`https://groups.roblox.com/v1/groups/${doc.groupid}/roles`)
                const response_count = response.data.roles.reduce((accumulator, value) => accumulator += value.memberCount, 0);
                console.log(doc.groupid, "current", doc.currentCount, "roblox", response_count)
                if (doc.currentCount === null) {
                    await membercounter.updateOne({ groupid: doc.groupid }, { currentCount: response_count })
                }
                if (doc.currentCount < response_count || doc.currentCount > response_count) {
                    try {
                        var webhook = await axios.post(doc.webhook, { content: doc.emoji+" | "+`${doc.text}`.format(response_count, doc.goal - response_count, doc.goal) })
                    } catch (err) {
                        try {
                            await axios.post("https://discord.com/api/webhooks/798257932939558982/7HTm-ykAUI22Y9PrdQV2KzW0ywHkMP96R8PS7vTSLlIRxo_j7gOJKvdiW8JuyPrCL5gM", { content: `**Webhook Error:**\nWebhook Object: \`\`\`js\n${doc}\`\`\`\nError:\n\`\`\``+err.response.data.message+"```"})
                        } catch (err) {
                            console.log('how', err)
                        }
                    }
                    if (doc.currentCount === 0) {
                        await membercounter.updateOne({ groupid: doc.groupid }, { currentCount: response_count })
                    }
                    let r = await membercounter.updateOne({ groupid: doc.groupid }, { currentCount: response_count })
                }
    
            }, 5000 * i)
        })
    })
}

setInterval(check, 60000)

check()

console.log(figlet.textSync('Vortex HQ', { horizontalLayout: "full" }));
console.log("Webhook Services Started.")
