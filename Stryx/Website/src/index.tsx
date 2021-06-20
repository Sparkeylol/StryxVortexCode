import { render, h, FunctionalComponent } from 'preact';
// import { LiveChatLoaderProvider, Intercom } from 'react-live-chat-loader';
import Home from './pages/Home';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';

/** @jsx h */

const App: FunctionalComponent = () => (
  <div id="app">
    <header>

      <Navbar links={[
        { label: 'Home', href: '/' },
        { label: 'Help Center', href: 'https://help.stryx.cloud' },
      ]} />
    </header>
    <main>
      <Hero />
      <div className="pt-2 container mx-auto py-3 mt-5">
        <Home />
      </div>
    </main>
    <Footer />
    {/* <LiveChatLoaderProvider provider="intercom" providerKey="ajm5n97i">
      <Intercom />
    </LiveChatLoaderProvider> */}
    {/* Had to remove that, Intercom wasn't working right. */}
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.body);
});
