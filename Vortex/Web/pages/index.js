import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card, Carousel, Spinner } from 'react-bootstrap';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faUsers, faForward, faRobot, faSortAmountUp, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';
import axios from 'axios'
import useSWR from 'swr'
import Image from 'next/image'

function Feature(props) {
  return (
    <>
      <Card>
        <Card.Body style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={props.icon} size="4x" />
          <h2>{props.title}</h2>
          <h5>{props.body}</h5>
        </Card.Body>
      </Card>
    </>
  )
}

export default function Home(props) {
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSWR("/api/stats", fetcher)

  return (
    <>
      <Navbar/>
      <NextSeo
        title="Vortex HQ"
        description="Vortex HQ is a Discord Bot company that specializes in Roblox communications."
      />
      <Container className="hero"> 
        <h1>Welcome to <span className="hero vortex-gradient">Vortex</span></h1>
        <h2>We're reimagining Discord Bot Services for the Roblox community.</h2>
        <Link href="/dashboard" passHref>
          <Button size="lg">Create a Bot!</Button>
        </Link>
      </Container>
      <Container fluid className="hero-features">
        <h1 style={{ paddingBottom: "8px", fontWeight: 800 }}>Why choose Vortex?</h1>
        <Row xs={1} sm={1} md={2} lg={3} xl={3}>
          <Col>
            <Feature icon={faDiscord} title="~2 Hour Discord Support" body="We all hate slow support response, so we've dedicated ourselves to making our response times to under 2 hours." />
          </Col>
          <Col>
            <Feature icon={faUsers} title="Community Driven" body="We socialize with our community and listen to what they want." />
          </Col>
          <Col>
            <Feature icon={faForward} title="Next-Gen Technologies" body="Our products are created with efficient code that ensures your bot will be lightning fast." />
          </Col>
        </Row>
      </Container>
      <Container fluid className="hero-testimonials">
        <h1 style={{ fontWeight: 800 }}>Don't ask us, ask them!</h1>
        <Carousel style={{ height: "300px", width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} controls={false}>
          <Carousel.Item>
            <h4>I would offer this bot to anyone. The staff at Vortex HQ are amazing because they answer as fast as they can! They're always kind in tickets. They also are always adding more commands. You can even pay in Robux or United States Dollars. I rate Vortex HQ 11/10!</h4>
            <h5>Eamjunior#1813</h5>
          </Carousel.Item>
          <Carousel.Item>
            <h4>I rate 10/10, this bot I wanted to try out, in-till I did it is amazing! I would 100% buy this bot, you get so much cool stuff, and almost every day theirs a new bot command.</h4>
            <h5>Fizzy#4474</h5>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container fluid className="hero-stats">
        <h1 style={{ fontWeight: 800 }}>Statistics</h1>
        {data ? <>
          <Row>
            <Col>
              <h3 style={{ fontWeight: 700 }}>{data.bots}</h3>
              <h5 style={{ fontWeight: 500 }}>Bots</h5>
            </Col>
            <Col>
              <h3 style={{ fontWeight: 700 }}>{data.users}</h3>
              <h5 style={{ fontWeight: 500 }}>Verified Users</h5>
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col>
              <h3 style={{ fontWeight: 700 }}>{data.membercounters}</h3>
              <h5 style={{ fontWeight: 500 }}>Member Counters</h5>
            </Col>
            <Col>
              <h3 style={{ fontWeight: 700 }}>99.9%</h3>
              <h5 style={{ fontWeight: 500 }}>uptime</h5>
            </Col>
          </Row>          
        </> : <>
          <h3>Fetching stats...</h3>
          <Spinner animation="border" variant="primary" />
        </>}
      </Container>
      <Container fluid className="hero-tools">
        <h1 style={{ fontWeight: 800 }}>Our Products</h1>
        <Row xs={1} sm={1} lg={2}>
          <Col lg={4}>
            <Row style={{ paddingBottom: "16px" }}>
              <Col>
                <Card style={{ textAlign: 'left', padding: "30px", height: "100%", borderRadius: 0, border: 0 }}>
                  <h4 style={{ fontWeight: 700 }}><FontAwesomeIcon icon={faSortAmountUp} /> Member Counting</h4>
                  <p>FREE member counting webhook for your Roblox Group.</p>
                </Card>
              </Col>
            </Row>
            <Row style={{ paddingBottom: "16px" }}>
              <Col>
                <Card style={{ textAlign: 'left', padding: "30px", height: "100%", borderRadius: 0, border: 0 }}>
                  <h4 style={{ fontWeight: 700 }}><FontAwesomeIcon icon={faCalendar} /> Much more coming soon!</h4>
                  <p>Keep an eye out on our Discord server and website! We have much more coming. Stay tuned!</p>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Card style={{ textAlign: 'left', padding: "30px", height: "100%", borderRadius: 0, border: 0 }}>
              <h4 style={{ fontWeight: 700 }}><FontAwesomeIcon icon={faRobot} /> Bot</h4>
              <Image src="/img/frontpageimage.webp" width="1348" height="442" alt="Bot demonstration"/>
              <p>Our uber-customizable bot is cheap yet powerful. We've built them to be super easy to use, while still being reliable. Why have the need to create your own Discord bot, when we do it for you!</p>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
