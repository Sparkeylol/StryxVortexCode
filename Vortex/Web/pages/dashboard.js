import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner } from 'react-bootstrap';
import Header from '../components/Navbar'
import Footer from '../components/Footer';
import Axios from 'axios'
import {useAsyncMemo} from "use-async-memo"
import { useSession, signIn } from 'next-auth/client'
import Server from '../components/Server'
import { toast, ToastContainer } from 'react-toastify';
import { NextSeo } from 'next-seo';


export default function Dashboard() {
    const [session, loading] = useSession()

    if (!session && !loading) {
        signIn('discord', { callbackUrl: '/dashboard' })
        return null
    }

    let serverList = async () => {
        const bearer = await Axios.post("/api/accounts", {
            "email": session.user.email
        },{
            headers: {
                "Authorization": session.accessToken
            }
        })
        var servers
        try {
            servers = await Axios.get('https://discord.com/api/v8/users/@me/guilds', {
                headers: {
                    "Authorization": "Bearer "+bearer.data.body.accessToken
                }
            })
        } catch (err) {
            console.log('catch')
            toast.error(err.message+". Try logging out and back in.")
            return
        }
        if (typeof servers == 'undefined') {
            toast.error("Servers is undefined.")
            return
        }
        return servers.data.map(server => {
            if ((server.permissions & 0x8) === 0x8) {
                return <Server image={server.icon === null ? "/img/Icon.svg" : "https://cdn.discordapp.com/icons/"+server.id+"/"+server.icon+".png"} serverName={server.name} id={server.id} />
            }
        })
    
    }

    return <>
        <Header />
        <NextSeo
            title="Dashboard | Vortex HQ"
            description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
        />
        <Container style={{ paddingTop: "16px", paddingBottom: "16px", textAlign: 'center' }}>
        <ToastContainer />
        {loading && <>
            <Spinner animation="border" variant="primary" />
        </>}
        {!loading && <>
            <h1 style={{ fontWeight: 700 }}>Hey there, {session.user.name}!</h1>
            <h5 style={{ fontWeight: 700 }}>Here are your servers!</h5>
            {useAsyncMemo(serverList, [])}
        </>}
        </Container>
        <Footer />
    </>
}