import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';
import * as animationData from './data/Stryx.json';

const Loading = ({ loading }: { loading: false | boolean }): JSX.Element => (
  <div className={`flex justify-center items-center align-middle fixed h-screen w-screen dark:bg-gray-900 transform transition-all duration-300 ${loading ? 'z-50 opacity-100' : 'z-0 opacity-0'}`}>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          y: -10,
        },
        visible: {
          y: +10,
        },
      }}
    >
      <Lottie
        loop
        // i mean it works
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        animationData={animationData.default}
        play={loading}
        style={{ width: 64, height: 64 }}
      />
    </motion.div>
  </div>
);

export default Loading;
