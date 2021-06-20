
import Link from 'next/link'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Spinner, Form, Tabs, Tab } from 'react-bootstrap';
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
import { CirclePicker } from 'react-color';


import { getSession, signIn } from 'next-auth/client'

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

function DataComponent(props) {
    let server = props.server
    let guildSettings = props.guildsettings
    console.log(guildSettings)
    let session = props.session
    const [sessions_shift_channel, setSessionsShiftChannel] = useState(guildSettings.sessions.shifts.channel)
    const [sessions_shift_create, setSessionsShiftCreate] = useState(guildSettings.sessions.shifts.create)
    const [sessions_shift_role, setSessionsShiftRole] = useState(guildSettings.sessions.shifts.role)
    const [sessions_shift_text, setSessionsShiftText] = useState(guildSettings.sessions.shifts.text)
    const [sessions_shift_title, setSessionsShiftTitle] = useState(guildSettings.sessions.shifts.title)
    const [sessions_shift_color, setSessionsShiftColor] = useState(guildSettings.sessions.shifts.color)

    const [sessions_training_channel, setSessionsTrainingChannel] = useState(guildSettings.sessions.training.channel)
    const [sessions_training_create, setSessionsTrainingCreate] = useState(guildSettings.sessions.training.create)
    const [sessions_training_role, setSessionsTrainingRole] = useState(guildSettings.sessions.training.role)
    const [sessions_training_text, setSessionsTrainingText] = useState(guildSettings.sessions.training.text)
    const [sessions_training_title, setSessionsTrainingTitle] = useState(guildSettings.sessions.training.title)
    const [sessions_training_color, setSessionsTrainingColor] = useState(guildSettings.sessions.training.color)

    const [sessions_interview_channel, setSessionsInterviewChannel] = useState(guildSettings.sessions.interviews.channel)
    const [sessions_interview_create, setSessionsInterviewCreate] = useState(guildSettings.sessions.interviews.create)
    const [sessions_interview_role, setSessionsInterviewRole] = useState(guildSettings.sessions.interviews.role)
    const [sessions_interview_text, setSessionsInterviewText] = useState(guildSettings.sessions.interviews.text)
    const [sessions_interview_title, setSessionsInterviewTitle] = useState(guildSettings.sessions.interviews.title)
    const [sessions_interview_color, setSessionsInterviewColor] = useState(guildSettings.sessions.interviews.color)
    


    const handleSubmit = preventDefault(async () => {
        axios.post("/api/guilds/"+server.id+"/sessions", { 
            sessions: {
                shifts: {
                    channel: sessions_shift_channel,
                    create: sessions_shift_create,
                    role: sessions_shift_role,
                    text: sessions_shift_text,
                    title: sessions_shift_title,
                    color: sessions_shift_color,
                },
                training: {
                    channel: sessions_training_channel,
                    create: sessions_training_create,
                    role: sessions_training_role,
                    text: sessions_training_text,
                    title: sessions_training_title,
                    color: sessions_training_color,
                },
                interviews: {
                    channel: sessions_interview_channel,
                    create: sessions_interview_create,
                    role: sessions_interview_role,
                    text: sessions_interview_text,
                    title: sessions_interview_title,
                    color: sessions_interview_color,
                }
            },
        }, { headers: { "Authorization": session.accessToken, 'Content-Type' : 'application/json; charset=UTF-8', 'Accept': 'Token', "Access-Control-Allow-Origin": "*", } }).then(res => {
            if (res.data.error) {
                return toast.error(res.data.message)
            }
            toast.success(res.data.message)
        }).catch(err => {
            toast.error(err)
        })
    })

    const handleShiftChannelIdChange = e => {
        setSessionsShiftChannel(e.target.value)
    }

    const handleShiftTitleChange = e => {
        setSessionsShiftTitle(e.target.value)
    }

    const handleShiftTextChange = e => {
        setSessionsShiftText(e.target.value)
    }

    const handleShiftColorChange = (color) => {
        setSessionsShiftColor(color.hex)
    }

    const handleShiftRole = e => {
        setSessionsShiftRole(e.target.value)
    }

    const handleShiftCreateRole = e => {
        setSessionsShiftCreate(e.target.value)
    }

    
    const handleTrainingChannelIdChange = e => {
        setSessionsTrainingChannel(e.target.value)
    }

    const handleTrainingTitleChange = e => {
        setSessionsTrainingTitle(e.target.value)
    }

    const handleTrainingTextChange = e => {
        setSessionsTrainingText(e.target.value)
    }

    const handleTrainingColorChange = (color) => {
        setSessionsTrainingColor(color.hex)
    }

    const handleTrainingRole = e => {
        setSessionsTrainingRole(e.target.value)
    }

    const handleTrainingCreateRole = e => {
        setSessionsTrainingCreate(e.target.value)
    }


    const handleInterviewChannelIdChange = e => {
        setSessionsInterviewChannel(e.target.value)
    }

    const handleInterviewTitleChange = e => {
        setSessionsInterviewTitle(e.target.value)
    }

    const handleInterviewTextChange = e => {
        setSessionsInterviewText(e.target.value)
    }

    const handleInterviewColorChange = (color) => {
        setSessionsInterviewColor(color.hex)
    }

    const handleInterviewRole = e => {
        setSessionsInterviewRole(e.target.value)
    }

    const handleInterviewCreateRole = e => {
        setSessionsInterviewCreate(e.target.value)
    }


    return <>
        <DashNav name={server.name} id={server.id} />
        <Container style={{ paddingTop: "16px", paddingBottom: "16px", textAlign: 'center' }}>

        <Image src={server.icon === null ? "/img/Icon.svg" : "https://cdn.discordapp.com/icons/"+server.id+"/"+server.icon+".png"} className="roundedImage" unoptimized quality={100} width="180" height="180"></Image>
            <h1 style={{ fontWeight: 700 }}>{server.name}</h1>
            <h3 style={{ fontWeight: 700 }}>Sessions Settings</h3>
            <Container style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                
                <Form onSubmit={handleSubmit}>
                    <Tabs defaultActiveKey="shift" id="tabs">
                        <Tab eventKey="shift" title="Shifts">
                            <Form.Group>
                                <Form.Label>Channel ID</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.shifts.channel} onChange={handleShiftChannelIdChange}/>
                                <Form.Text className="text-muted">Enable <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">Developer Mode</a> on Discord and right click on a channel to copy it's ID.</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Title</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.shifts.title} onChange={handleShiftTitleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Text</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.shifts.text} onChange={handleShiftTextChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Color</Form.Label>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CirclePicker onChangeComplete={handleShiftColorChange} color={guildSettings.sessions.shifts.color} colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"]}/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role ID to ping</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.shifts.role} onChange={handleShiftRole}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role ID to create sessions</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.shifts.create} onChange={handleShiftCreateRole}/>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="training" title="Trainings">
                            <Form.Group>
                                <Form.Label>Channel ID</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.training.channel} onChange={handleTrainingChannelIdChange}/>
                                <Form.Text className="text-muted">Enable <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">Developer Mode</a> on Discord and right click on a channel to copy it's ID.</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Title</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.training.title} onChange={handleTrainingTitleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Text</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.training.text} onChange={handleTrainingTextChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Color</Form.Label>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CirclePicker onChangeComplete={handleTrainingColorChange} color={guildSettings.sessions.training.color} colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"]}/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role ID to ping</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.training.role} onChange={handleTrainingRole}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role ID to create sessions</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.training.create} onChange={handleTrainingCreateRole}/>
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="interview" title="Interviews">
                            <Form.Group>
                                <Form.Label>Channel ID</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.interviews.channel} onChange={handleInterviewChannelIdChange}/>
                                <Form.Text className="text-muted">Enable <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">Developer Mode</a> on Discord and right click on a channel to copy it's ID.</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Title</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.interviews.title} onChange={handleInterviewTitleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Text</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.interviews.text} onChange={handleInterviewTextChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Embed Color</Form.Label>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <CirclePicker onChangeComplete={handleInterviewColorChange} color={guildSettings.sessions.interviews.color} colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"]}/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role ID to ping</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.interviews.role} onChange={handleInterviewRole}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role ID to create sessions</Form.Label>
                                <Form.Control type="text" name="channel" defaultValue={guildSettings.sessions.interviews.create} onChange={handleInterviewCreateRole}/>
                            </Form.Group>
                        </Tab>
                    </Tabs>
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

export default function Sessions(props) {
    const router = useRouter()
    const { serverid } = router.query
    const fetcher = url => axios.get(url, { headers: { "Authorization": props.session.accessToken }}).then(res => res.data)
    const { data, error } = useSWR("/api/guilds/"+serverid, fetcher)


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
            title="Sessions | Vortex HQ"
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
                title="Sessions | Vortex HQ"
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
            title="Sessions | Vortex HQ"
            description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
        />
        <ToastContainer />
        {data ? <DataComponent server={data.body.server} guildsettings={data.body.guildSettings} session={props.session}/> : <Spinner animation="border" variant="primary" />}
        <Footer />
    </>
}