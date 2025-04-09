import { motion } from "framer-motion";

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const AnimatedTitle = () => {
  return (
    <motion.h1
      className="text-6xl m-4 font-bold text-blue-400"
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      IOT EV SMART PLUG
    </motion.h1>
  );
};

export default AnimatedTitle;
