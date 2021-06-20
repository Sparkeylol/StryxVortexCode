
import Link from 'next/link'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Spinner, Form, Accordion } from 'react-bootstrap';
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
    let botid = props.botid
    const [prefix, setPrefix] = useState(guildSettings.prefix)
    const [token, setToken] = useState(guildSettings.bottoken)
    const [statusType1, setStatusType1] = useState(guildSettings.statuses[0]?.type ?? "PLAYING")
    const [statusType2, setStatusType2] = useState(guildSettings.statuses[1]?.type ?? "PLAYING")
    const [statusType3, setStatusType3] = useState(guildSettings.statuses[2]?.type ?? "PLAYING")

    const [statusText1, setStatusText1] = useState(guildSettings.statuses[0]?.text ?? "")
    const [statusText2, setStatusText2] = useState(guildSettings.statuses[1]?.text ?? "")
    const [statusText3, setStatusText3] = useState(guildSettings.statuses[2]?.text ?? "")

    console.log(guildSettings)

    const handlePrefixChange = e => {
        setPrefix(e.target.value)
    }

    const handleTokenChange = e => {
        setToken(e.target.value)
    }

    const handleSubmit = preventDefault(() => {
        axios.post("/api/guilds/"+server.id+"/general", { 
            "prefix": prefix,
            "statuses": [
                {
                    "type": statusType1,
                    "text": statusText1
                },
                {
                    "type": statusType2,
                    "text": statusText2
                },
                {
                    "type": statusType3,
                    "text": statusText3
                }
            ],
            "token": token
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
            <h3 style={{ fontWeight: 700 }}>Generic Bot Settings</h3>
            <Container style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                
                <Form onSubmit={handleSubmit}>
                    {/* <a href={`https://discord.com/api/oauth2/authorize?client_id=${botid}&permissions=8&scope=bot`} target="_blank">
                        <Button variant="outline-success">Invite Bot</Button>
                    </a> */}
                    <Form.Group>
                        <Form.Label>Prefix</Form.Label>
                        <Form.Control type="text" name="prefix" placeholder="Default: -" defaultValue={guildSettings.prefix} onChange={handlePrefixChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bot Token</Form.Label>
                        <Form.Control type="text" name="token" defaultValue={guildSettings.bottoken} onChange={handleTokenChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Configure Status
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <>
                                        <Card style={{ padding: "10px", margin: "5px" }}>
                                            <Card.Header>Status 1</Card.Header>
                                            <Form.Group controlId="general.statusselect">
                                                <Form.Label>Status Type</Form.Label>
                                                <Form.Control as="select" defaultValue={guildSettings.statuses[0]?.type ?? "PLAYING"} onChange={(e) => {
                                                    e.preventDefault()
                                                    setStatusType1(e.target.value)
                                                }}>
                                                    <option value="PLAYING">Playing</option>
                                                    <option value="WATCHING">Watching</option>
                                                    <option value="LISTENING">Listening To</option>
                                                    <option value="COMPETING">Competing In</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Label>Status Text</Form.Label>
                                            <Form.Control type="text" name="statustext" defaultValue={guildSettings.statuses[0]?.text ?? ""} onChange={(e) => {
                                                e.preventDefault()
                                                setStatusText1(e.target.value)
                                            }}/>
                                        </Card>
                                        <Card style={{ padding: "10px", margin: "5px" }}>
                                            <Card.Header>Status 2</Card.Header>
                                            <Form.Group controlId="general.statusselect">
                                                <Form.Label>Status Type</Form.Label>
                                                <Form.Control as="select" defaultValue={guildSettings.statuses[1]?.type ?? "PLAYING"} onChange={(e) => {
                                                    e.preventDefault()
                                                    setStatusType2(e.target.value)
                                                }}>
                                                    <option value="PLAYING">Playing</option>
                                                    <option value="WATCHING">Watching</option>
                                                    <option value="LISTENING">Listening To</option>
                                                    <option value="COMPETING">Competing In</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Label>Status Text</Form.Label>
                                            <Form.Control type="text" name="statustext" defaultValue={guildSettings.statuses[1]?.text ?? ""} onChange={(e) => {
                                                e.preventDefault()
                                                setStatusText2(e.target.value)
                                            }}/>
                                        </Card>
                                        <Card style={{ padding: "10px", margin: "5px" }}>
                                            <Card.Header>Status 3</Card.Header>
                                            <Form.Group controlId="general.statusselect">
                                                <Form.Label>Status Type</Form.Label>
                                                <Form.Control as="select" defaultValue={guildSettings.statuses[2]?.type ?? "PLAYING"} onChange={(e) => {
                                                    e.preventDefault()
                                                    setStatusType3(e.target.value)
                                                }}>
                                                    <option value="PLAYING">Playing</option>
                                                    <option value="WATCHING">Watching</option>
                                                    <option value="LISTENING">Listening To</option>
                                                    <option value="COMPETING">Competing In</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Label>Status Text</Form.Label>
                                            <Form.Control type="text" name="statustext" defaultValue={guildSettings.statuses[2]?.text ?? ""} onChange={(e) => {
                                                e.preventDefault()
                                                setStatusText3(e.target.value)
                                            }}/>
                                        </Card>
                                    </>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <Form.Group>
                            <Form.Label>Enable Branding</Form.Label>
                            <Form.Check type="switch" id="bindnames" label="Enabled" defaultChecked={guildSettings.branding} disabled />
                            <Form.Text className="text-muted">This can only be changed by our staff (for now). To disable branding, please complete a one-time purchase found on our Sellix page <Link href="https://sellix.io/product/5ffbb94042315">here</Link></Form.Text>
                        </Form.Group>
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

export default function General(props) {
    const router = useRouter()
    const { serverid } = router.query
    const fetcher = url => axios.get(url, { headers: { "Authorization": props.session.accessToken }}).then(res => res.data)
    const { data, error } = useSWR("/api/guilds/"+serverid, fetcher)

    console.log(data)

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
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "200px" }}>
            <Spinner animation="border" variant="success" />
        </Container>
        <Footer />
    </> 

    if (data.body.guildSettings === null || Date.parse(data.body.guildSettings.expiresAt) < Date.now()) {
        return <>
            <Header />
            <NextSeo
                title="General | Vortex HQ"
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
    // var botid
    // axios.get("https://discord.com/api/oauth2/applications/@me", { headers: { "Authorization": "Bot "+data.body.guildSettings.bottoken, "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" } }).then(r => {
    //     botid = r.data.id
    // })

    return <>
        <Header />
        <NextSeo
            title="General | Vortex HQ"
            description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
        />
        <ToastContainer />
        {data ? <DataComponent server={data.body.server} guildsettings={data.body.guildSettings} session={props.session} /> : <Spinner animation="border" variant="primary" />}
        <Footer />
    </>
}