import { Container, Navbar, FormCheck } from 'react-bootstrap'
import useDarkMode from 'use-dark-mode';
import { useState } from 'react';
import Link from 'next/link'

const Toggle = ({ checked, onChange }) => (
  <FormCheck 
    type="switch"
    id="darkmode"
    label="Dark Mode"
    checked={checked}
    onChange={onChange}
  />
);

const Footer = () => {
  const darkMode = useDarkMode(true, { classNameDark: "dark", classNameLight: "light" });
  const [isDarkMode, setIsDarkMode] = useState(() => darkMode.value);
  return (
    <>
      <Navbar className="navbar-footer" expand="lg" sticky="bottom">
              <Container>
                  <div className="footer">
                      Made with <span className="heart">❤</span> in the USA
                      <br/>
                      Copyright 2020 © Vortex HQ
                      <br/>
                      <Link href="/legal/tos">Terms</Link> | <Link href="/legal/privacy">Privacy</Link>
                      <div>
                        <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
                      </div>
                  </div>
              </Container>
      </Navbar>
    </>
  )
}

export default Footer
