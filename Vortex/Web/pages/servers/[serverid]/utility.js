import Link from 'next/link'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Spinner, Form } from 'react-bootstrap';
import Header from '../../../components/Navbar'
import Footer from '../../../components/Footer';
import DashNav from '../../../components/DashNav'
import { useState } from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextSeo } from 'next-seo';


import { getSession, signIn } from 'next-auth/client'

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

function DataComponent(props) {
    let server = props.server
    let guildSettings = props.guildsettings
    let session = props.session
    const [modrole, setModrole] = useState(guildSettings.modroleid)
    const [logchannel, setLogChannel] = useState(guildSettings.logchannelid)
    const [supportteamid, setSupportTeamId] = useState(guildSettings.supportteamid)
    const [ticketcatid, setTicketCatId] = useState(guildSettings.ticketcadid)
    const [suggestionchannelid, setSuggestionChannelId] = useState(guildSettings.suggestionid)

    const handleModRoleChange = e => {
        setModrole(e.target.value)
    }

    const handleLogChannelChange = e => {
        setLogChannel(e.target.value)
    }

    const handleSupportTeamChange = e => {
        setSupportTeamId(e.target.value)
    }

    const handleTicketCatIdChange = e => {
        setTicketCatId(e.target.value)
    }

    const handleSuggestionChannelIdChange = e => {
        setSuggestionChannelId(e.target.value)
    }

    const handleSubmit = preventDefault(async () => {
        axios.post("/api/guilds/"+server.id+"/utility", { 
            modroleid: modrole,
            logchannelid: logchannel,
            supportteamid: supportteamid,
            ticketcadid: ticketcatid,
            suggestionid: suggestionchannelid,
        }, { headers: { "Authorization": session.accessToken, 'Content-Type' : 'application/json; charset=UTF-8', 'Accept': 'Token', "Access-Control-Allow-Origin": "*", } }).then(res => {
            if (res.data.error) {
                return toast.error(res.data.message)
            }
            toast.success(res.data.message)
        }).catch(err => {
            toast.error(err)
        })
    })
    console.log(server, guildSettings, session)
    return <>
        <DashNav name={server.name} id={server.id} />
        <Container style={{ paddingTop: "16px", paddingBottom: "16px", textAlign: 'center' }}>

        <Image src={server.icon === null ? "/img/Icon.svg" : "https://cdn.discordapp.com/icons/"+server.id+"/"+server.icon+".png"} className="roundedImage" unoptimized quality={100} width="180" height="180"></Image>
            <h1 style={{ fontWeight: 700 }}>{server.name}</h1>
            <h3 style={{ fontWeight: 700 }}>Utility Settings</h3>
            <Container style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Mod Role ID</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.modroleid} onChange={handleModRoleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Log Channel ID</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.logchannelid} onChange={handleLogChannelChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Support Team Role ID</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.supportteamid} onChange={handleSupportTeamChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ticket Category ID</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.ticketcadid} onChange={handleTicketCatIdChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Suggestion Channel ID</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.suggestionid} onChange={handleSuggestionChannelIdChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Container>
        </Container>
    </>
}

export async function getServerSideProps(context) {
    const req = context.req
    const session = await getSession({ req })
    return {
        props: {session: session}, 
    }
}

export default function Utility(props) {
    const router = useRouter()
    const { serverid } = router.query
    const fetcher = url => axios.get(url, { headers: { "Authorization": props.session.accessToken }}).then(res => res.data)
    const { data, error } = useSWR("/api/guilds/"+serverid, fetcher)

    const [token, setToken] = useState('')


    const handleTokenChange = e => {
        e.preventDefault()
        setToken(e.target.value)
    }

    const handleTokenSubmit = e => {
        e.preventDefault()

        axios.post("/api/redeem", {
            code: token,
            guildid: serverid
        }, {
            headers: {
                "Authorization": props.session.accessToken
            }
        }).then(res => {
            if (res.data.error) {
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message)
            router.reload()
        })
    }

    if (!props.session) {
        signIn('discord', { callbackUrl: '/dashboard' })
        return null
    }

    if (error) { 
        console.log(error)
    }
    if (!data) return <>
        <Header />
        <NextSeo
            title="Utility | Vortex HQ"
            description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
        />
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "200px" }}>
            <Spinner animation="border" variant="success" />
        </Container>
        <Footer />
    </> 

    if (data.body.guildSettings === null || Date.parse(data.body.guildSettings.expiresAt) < Date.now()) {
        return <>
            <Header />
            <NextSeo
                title="Utility | Vortex HQ"
                description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
            />
            <ToastContainer />
            <Container style={{ paddingTop: "16px", paddingBottom: "16px", textAlign: 'center' }}>
                <h3>Uh oh! Your bot hasn't been registered or has expired!</h3>
                <Form onSubmit={handleTokenSubmit}>
                    <Form.Group controlId="token">
                        <Form.Label>Token</Form.Label>
                        <Form.Control type="text" placeholder="Enter token" onChange={handleTokenChange}/>
                        <Button variant="outline-success" style={{ marginTop: "8px" }} data-sellix-product="5fe0cd14a923a" data-sellix-custom-discord={`@${props.session.user.name}`}>Buy on Sellix</Button>
                        <Form.Text className="text-muted">
                            You should've gotten this in your email. 
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Link href="/dashboard" passHref>
                  <Button variant="outline-success" style={{ marginTop: "8px" }}>Back to Dashboard</Button>
                </Link>
            </Container>
            <Footer />
        </>
    }

    return <>
        <Header />
        <NextSeo
            title="Utility | Vortex HQ"
            description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
        />
        <ToastContainer />
        {data ? <DataComponent server={data.body.server} guildsettings={data.body.guildSettings} session={props.session}/> : <Spinner animation="border" variant="primary" />}
        <Footer />
    </>
}