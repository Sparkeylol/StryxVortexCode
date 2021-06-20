import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { NextSeo } from 'next-seo'

export default function Pricing() {
  return (
    <>
      <Navbar/>
      <NextSeo
        title="Pricing | Vortex HQ"
        description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
      />
      <Container className="hero">
        <h1><span className="hero vortex-gradient">Pricing</span></h1>
        <h2>Thanks for taking an interest in us! We try to keep our prices low, while still keeping the quality hosting we provide.</h2>
      </Container>
      <Container fluid className="pricing">
        <h1 style={{ paddingBottom: "8px", fontWeight: 800 }}>Pricing</h1>
        <h5 style={{ paddingBottom: "8px", fontWeight: 800 }}>Our prices are only low because of non-invasive advertising. Please turn off your adblocker so you can help support this service.</h5>
        <h1 style={{ fontWeight: 600 }}>Member Counter</h1>
        <Row style={{ marginBottom: "16px" }}>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title>Member Counter / $0 per month</Card.Title>
                        <Card.Body>
                            <p>Our free member counter is a quick and easy way to set a member goal for your group. It's powered by webhooks and requires no work from you.</p>
                        </Card.Body>
                        <Link href="https://discord.vortexhq.net" passHref>
                            <Button block variant="outline-success">Join Discord to Create</Button>
                        </Link>
                    </Card.Header>
                </Card>
            </Col>
        </Row>
        <h1 style={{ fontWeight: 600 }}>Vortex Discord Bot</h1>
        <p>The Vortex HQ bot is a fully featured bot that is made to match your brand identity. It's fully customizable and ready to use instantly.</p>
        <p>For a one time fee of $15, you can remove our branding to make it seamlessly integrate with the rest of your brand.</p>
        <Row xs={1} sm={1} md={2} lg={3} xl={3}>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title>Monthly / $2 per month</Card.Title>
                        <Card.Body>
                        </Card.Body>
                        <div style={{ display: 'block', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                          <Link href="/dashboard" passHref>
                            <Button block variant="outline-success" style={{ marginBottom: '8px' }}>Go to Dashboard</Button>
                          </Link>
                          <Button block variant="outline-success" data-sellix-product="5fe0cd14a923a">Buy on Sellix</Button>
                          <Link href="https://www.roblox.com/games/6111943301/Vortex-HQ-Product-Hub" passHref>
                            <Button block variant="outline-success" style={{ marginBottom: '8px' }}>Buy with Robux</Button>
                          </Link>
                        </div>
                    </Card.Header>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title>Semi-Annually / $9 per 6 months</Card.Title>
                        <Card.Body>
                        </Card.Body>
                        <div style={{ display: 'block', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                          <Link href="/dashboard" passHref>
                            <Button block variant="outline-success" style={{ marginBottom: '8px' }}>Go to Dashboard</Button>
                          </Link>
                          or
                          <Button block variant="outline-success" data-sellix-product="5fe4f246c8c71">Buy on Sellix</Button>
                        </div>
                    </Card.Header>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title>Annually / $12 per year</Card.Title>
                        <Card.Body>
                        </Card.Body>
                        <div style={{ display: 'block', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                          <Link href="/dashboard" passHref>
                            <Button block variant="outline-success" style={{ marginBottom: '8px' }}>Go to Dashboard</Button>
                          </Link>
                          or
                          <Button block variant="outline-success" data-sellix-product="5fe4f2bdb1539">Buy on Sellix</Button>
                        </div>
                    </Card.Header>
                </Card>
            </Col>
        </Row>
      </Container>
      <Container fluid className="pricing-more"> 
        <h1 style={{ paddingBottom: "8px", fontWeight: 800 }}>Want something more?</h1>
        <h5 style={{ paddingBottom: "8px", fontWeight: 800 }}>Contact our support line, and we'll work something out!</h5>
        <Link href="https://support.vortexhq.net" passHref>
            <Button block variant="outline-success">Contact Us</Button>
        </Link>
      </Container>
      <Footer />
    </>
  )
}
