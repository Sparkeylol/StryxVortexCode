import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { NextSeo } from 'next-seo'

export default function FAQ() {
  return (
    <>
      <Navbar/>
      <NextSeo
        title="FAQ | Vortex HQ"
        description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
      />
      <Container className="hero">
        <h1>Frequently Asked <span className="hero vortex-gradient">Questions</span></h1>
        <h2>Usually most questions are answered here! If you have any more, feel free to chat with us in the bottom right corner!</h2>
      </Container>
      <Container fluid className="hero-faq">
        <h1 style={{ paddingBottom: "8px", fontWeight: 800 }}>FAQ</h1>
        <h3 style={{ paddingBottom: "8px", fontWeight: 700 }}>How do I order a bot?</h3>
        <p style={{ fontWeight: 800 }}>We have multiple methods of payment.</p>
        <p style={{ fontWeight: 800 }}>For USD:</p>
        <p style={{ fontWeight: 800 }}>Go to our Sellix Page <Link href="https://sellix.io/vortexhq">here</Link>. Once you complete the payment, you'll recieve a code. Go to our <Link href="/dashboard">Dashboard</Link>, select a server, and paste your code in there.</p>
        <p style={{ fontWeight: 800 }}>For Robux / Roblox:</p>
        <p style={{ fontWeight: 800 }}>Contact us! Use the live chat in the bottom-right corner. Once you complete the payment, you'll recieve a code. Go to our <Link href="/dashboard">Dashboard</Link>, select a server, and paste your code in there.</p>
        <h3 style={{ paddingBottom: "8px", fontWeight: 700 }}>Where can I ask questions?</h3>
        <p style={{ fontWeight: 800 }}>We have a live chat integrated on our website to directly connect you to our Customer Support Agents. Please click the circle in the bottom-right to chat with us!</p>
      </Container>
      <Footer />
    </>
  )
}
