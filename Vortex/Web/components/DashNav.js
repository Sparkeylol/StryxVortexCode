import Link from 'next/link'
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap'
const DashNav = (props) => {
  return (
    <header>
      <Navbar className="light" sticky="top" expand="sm" style={{ minHeight: "3.25rem" }}>
        <Container fluid style={{ width: "75%" }}>
          <Link href={"/servers/"+props.id+"/general"} passHref>
            <Navbar.Brand style={{ fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: "white" }}>
                Server: {props.name}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="expand-nav" style={{ border: 0, color: 'transparent' }} />
          <Navbar.Collapse id="expand-nav">
            <Nav className="mr-auto">
              <Link href={"/servers/"+props.id+"/general"} passHref>
                <Nav.Link className="">General Settings</Nav.Link>
              </Link>
              <Link href={"/servers/"+props.id+"/welcoming"} passHref>
                <Nav.Link className="">Welcoming</Nav.Link>
              </Link>
              <Link href={"/servers/"+props.id+"/roblox"} passHref>
                <Nav.Link className="">Roblox</Nav.Link>
              </Link>
              <Link href={"/servers/"+props.id+"/utility"} passHref>
                <Nav.Link className="">Utility</Nav.Link>
              </Link>
              {/* <Link href={"/servers/"+props.id+"/reactionroles"} passHref>
                <Nav.Link className="">Reaction Roles</Nav.Link>
              </Link> soonTM */}
              <Link href={"/servers/"+props.id+"/sessions"} passHref>
                <Nav.Link className="">Sessions</Nav.Link>
              </Link>
            </Nav>
            <Form inline>
              <Link href="/dashboard" passHref>
                  <Button variant="outline-success">Back to Dashboard</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default DashNav
