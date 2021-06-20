import Link from 'next/link'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Spinner, Form, Table, Alert } from 'react-bootstrap';
import Header from '../../../components/Navbar'
import Footer from '../../../components/Footer';
import DashNav from '../../../components/DashNav'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextSeo } from 'next-seo';
import { CirclePicker } from 'react-color';


import { getSession, signIn } from 'next-auth/client'
import { useState } from 'react';

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

function DataComponent(props) {
    let server = props.server
    let guildSettings = props.guildsettings
    let session = props.session
    const [channelid, setChannelId] = useState(guildSettings.welcomechannel)
    const [text, setText] = useState(guildSettings.welcometext)
    const [title, setTitle] = useState(guildSettings.welcometitle)
    const [color, setColor] = useState(guildSettings.welcomecolor)

    const handleChannelIdChange = e => {
        setChannelId(e.target.value)
    }

    const handleTextChange = e => {
        setText(e.target.value)
    }

    const handleTitleChange = e => {
        setTitle(e.target.value)
    }

    const handleColorChange = (color) => {
        setColor(color.hex)
    }

    const handleSubmit = preventDefault(async () => {
        axios.post("/api/guilds/"+server.id+"/welcoming", { 
            welcomechannel: channelid,
            welcometext: text,
            welcometitle: title,
            welcomecolor: color,
        }, { headers: { "Authorization": session.accessToken, 'Content-Type' : 'application/json; charset=UTF-8', 'Accept': 'Token', "Access-Control-Allow-Origin": "*", } }).then(res => {
            if (res.data.error) {
                return toast.error(res.data.message)
            }
            toast.success(res.data.message)
        }).catch(err => {
            toast.error(err)
        })
    })

    return <>
        <DashNav name={server.name} id={server.id} />
        <Container style={{ paddingTop: "16px", paddingBottom: "16px", textAlign: 'center' }}>

        <Image src={server.icon === null ? "/img/Icon.svg" : "https://cdn.discordapp.com/icons/"+server.id+"/"+server.icon+".png"} className="roundedImage" unoptimized quality={100} width="180" height="180"></Image>
            <h1 style={{ fontWeight: 700 }}>{server.name}</h1>
            <h3 style={{ fontWeight: 700 }}>Welcoming Settings</h3>
            <Alert variant="error">You MUST have the "Server Members Intent" enabled for this to work. If it still doesn't work when enabled, please contact support using the live chat in the bottom right.   </Alert>
            <Container style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Channel ID</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.welcomechannel} onChange={handleChannelIdChange}/>
                        <Form.Text className="text-muted">Enable <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">Developer Mode</a> on Discord and right click on a channel to copy it's ID.</Form.Text>
                    </Form.Group>
                    <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                            <tr>
                                <th>Variables</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{"{0}"}</td>
                                <td>Username Tag (@User#0000)</td>
                            </tr>
                            <tr>
                                <td>{"{1}"}</td>
                                <td>Username (User)</td>
                            </tr>
                            <tr>
                                <td>{"{2}"}</td>
                                <td>Server Name</td>
                            </tr>
                            <tr>
                                <td>{"{3}"}</td>
                                <td>Server Member Count</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Form.Group>
                        <Form.Label>Embed Title</Form.Label>
                        <Form.Control type="text" name="channel" defaultValue={guildSettings.welcometitle} onChange={handleTitleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Embed Text</Form.Label>
                        <Form.Control as="textarea" rows={3} name="channel" defaultValue={guildSettings.welcometext} onChange={handleTextChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Embed Color</Form.Label>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CirclePicker onChangeComplete={handleColorChange} color={guildSettings.welcomecolor} colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"]}/>
                        </div>
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

export default function Welcoming(props) {
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
            title="Welcoming | Vortex HQ"
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
                title="Welcoming | Vortex HQ"
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
            title="Welcoming | Vortex HQ"
            description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
        />
        <ToastContainer />
        {console.log(data.body.server)}
        {data ? <DataComponent server={data.body.server} guildsettings={data.body.guildSettings} session={props.session}/> : <Spinner animation="border" variant="primary" />}
        <Footer />
    </>
}