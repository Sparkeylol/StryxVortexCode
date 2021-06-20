import Link from 'next/link'
import { Navbar, Nav, Form, Button, Container, DropdownButton, Dropdown, Spinner } from 'react-bootstrap'
import { signin, signout, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image'

const Header = () => {
  const [session, loading] = useSession();
  return (
    <header>
      <Navbar className="light" sticky="top" expand="sm" style={{ minHeight: "3.25rem" }}>
        <Container fluid style={{ width: "75%" }}>
          <Link href="/" passHref>
            <Navbar.Brand style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} alt="Vortex HQ Logo">
              <Image
                alt=""
                src="/img/LogoColor.svg"
                className="d-inline-block align-top"
                style={{ marginRight: '4px'}}
                width="115px"
                height="75px"
              />{' '}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="expand-nav" style={{ border: 0, color: 'transparent' }} />
          <Navbar.Collapse id="expand-nav">
            <Nav className="mr-auto">
              <Link href="/faq" passHref>
                <Nav.Link className="">FAQ</Nav.Link>
              </Link>
              <Link href="/pricing" passHref>
                <Nav.Link className="">Pricing</Nav.Link>
              </Link>
              <Link href="https://support.vortexhq.net" passHref>
                <Nav.Link className="">Support</Nav.Link>
              </Link>

            </Nav>
            <Form inline>
            {loading && (
              <>
                <Spinner animation="border" variant="success" />
              </>
            )}
            {!session && !loading && (
                  <Nav.Link
                    onClick={(e) => {
                      e.preventDefault();
                      signin('discord');
                    }}
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    <Button variant="primary" style={{ backgroundColor: "#7289da", borderColor: "#7289da", fontWeight: 700 }}><FontAwesomeIcon icon={faDiscord} size="1x" /> Sign In with Discord</Button>
                  </Nav.Link>
                )}
                {session && (
                  <>
                    <DropdownButton variant="link" id="user-dropdown" title={session.user.name}>
                      <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                      <Dropdown.Item onClick={(e) => { e.preventDefault(); signout({ callbackUrl: "/" }); }}>Sign Out</Dropdown.Item>
                    </DropdownButton>
                  </>
                )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
