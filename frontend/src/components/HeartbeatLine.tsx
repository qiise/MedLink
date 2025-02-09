import { motion } from "framer-motion";

const HeartbeatLine = () => {
  return (
    <div className="absolute bottom-[10rem] left-0 w-full overflow-hidden">
      <svg
        className="w-full h-16 md:h-24 lg:h-32 text-[#0EA5E9]"
        viewBox="0 0 600 20" // Keep the width large enough for the heartbeat line to stretch
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 10 H60 L70 1 L80 20 L90 10 H120 L130 2 L140 18 L150 10 H180 L190 5 L200 15 L210 10 H240 L250 1 L260 21 L270 10 H300 L310 5 L320 15 L330 10 H360 L370 2 L380 18 L390 10 H420 L430 5 L440 15 L450 10 H480 L490 5 L500 15 L510 10 H540 L550 1 L560 20 L570 10 H600"
          stroke="#add8e6"
          strokeWidth="1"
          fill="none"
          className="heartbeat-animation"
          animate={{
            pathLength: [0, 1, 0], // Draw from 0 to 1, then erase from 1 to 0 (left to right)
          }}
          transition={{
            duration: 8, // Duration for one full cycle (drawing + erasing)
            repeat: Infinity, // Repeat indefinitely
            repeatType: "loop", // Loop for continuous effect
            ease: "easeInOut", // Smooth easing for the animation
          }}
        />
      </svg>
    </div>
  );
};

export default HeartbeatLine;
