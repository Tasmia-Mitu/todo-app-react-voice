import { motion } from "framer-motion"; // Import motion from framer-motion

const WelcomeMessage = () => {
  return (
    <motion.div
      className="container welcome-container"
      initial={{ opacity: 0, scale: 0.8 }} // Initial state
      animate={{ opacity: 1, scale: 1 }} // Final state
      transition={{ duration: 1, ease: "easeOut" }} // Smooth transition with easing
    >
      <motion.h2
        className="welcome-header"
        initial={{ y: -50, opacity: 0 }} // Start slightly above and invisible
        animate={{ y: 0, opacity: 1 }} // Move to normal position and fade in
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }} // Adding bounce effect
      >
        <span className="emoji">🌿</span> Welcome to{" "}
        <span className="highlighted-text">GreenTask</span>!
      </motion.h2>
      <motion.p
        className="welcome-text"
        initial={{ opacity: 0 }} // Initially hidden
        animate={{ opacity: 1 }} // Fade in effect
        transition={{ delay: 1.2, duration: 0.8 }} // Delayed fade-in
      >
        Let's make today productive and meaningful 🌱
      </motion.p>
    </motion.div>
  );
};

export default WelcomeMessage;
