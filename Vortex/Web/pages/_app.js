import React from 'react'
import { Provider } from 'next-auth/client'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../public/css/globals.css';
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App ({ Component, pageProps }) {
  console.log(pageProps)
  return (
    <Provider session={pageProps.session}>
      <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.intercomSettings = {
              app_id: "ajm5n97i"
            };
            `
          }} />

          <script src="https://cdn.sellix.io/static/js/embed.js" />
        {/* <meta name="hilltopads-site-verification" content="97ecdcc960ab67b682f787d88339d9e17fc2957b" />
        <script dangerouslySetInnerHTML={{ __html: `(function(__htas){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = __htas || {};
        s.src = "\/\/apprefaculty.pro\/aMW\/Z.yJQ\/2Q9\/kKZETW9B6NbA2n5wlFSZWlQv9SN\/DxEh2dM\/jiEh2dNSyy0c0HMnTPYLyrMmTLYB4\/JtnhBm1Bcm2shFaIbr2T5QlaSmWAQJ9\/NpDsEb2bMVjcEV2XNNy-0X0GMITKYvyHMcT\/Y\/4H";
        l.parentNode.insertBefore(s, l);
        })({})`}} /> */}
        <script dangerouslySetInnerHTML={{ __html: `console.log("%c" + "Hold Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
          console.log("%c" + "If you were told to paste anything in here, it's most likely a scam.", "color: #ba2825; -webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;");
          console.log("%c" + "Pasting anything in here could give attackers to access your Vortex account.", "color: #ba2825; -webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;");
          console.log("%c" + "If you don't understand anything, close this window.", "-webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;");
          console.log("%c" + "If you do understand what you're doing, come work with us! https://vortexhq.net/jobs", "-webkit-text-stroke: 2px black; font-size: 16px; font-weight: bold;");
      ` }} />
        <script async defer data-domain="vortexhq.net" src="https://analytics.vortexhq.net/js/plausible.js"></script>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}
