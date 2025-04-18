import { Box, Button, Heading} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroOverlay = ({ onDismiss }) => {
  const slogans = [
    "Stomach says yes, brain says ‘uhhh’?",
    "Can’t decide? Let us chew on it!",
    "You’re hungry. We get it. Now pick something!",
    "Still scrolling while your stomach growls?",
    "Feed your belly, not your indecision.",
    "Too many options. Zero decisions. Sounds familiar?",
    "Your next meal? Let fate decide.",
    "Spin it. Eat it. Love it.",
    "Lost in the fridge again?"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(255, 255, 255, 0.9)"
      zIndex={2000}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Heading
            fontSize={["2xl", "3xl", "4xl", "5xl"]}
            mb={6}
            textAlign="center"
            maxW={["90%", "80%", "70%", "60%"]}
            whiteSpace="normal"
            lineHeight="1.2"
            px={[4, 8]}
          >
            {slogans[index]}
          </Heading>
        </motion.div>
      </AnimatePresence>
      <Button
        size="lg"
        colorScheme="teal"
        onClick={onDismiss}
        transition="all 0.3s ease-in-out" // 保留平滑过渡效果
        _hover={{
          bg: "teal.500", // 悬停时背景变亮（或保持 teal.500）
          color: "white", // 悬停时文字变白
          transform: "scale(1.1)", // 悬停时按钮放大
        }}
        _active={{
          bg: "teal.700", // 点击时背景变暗
          transform: "scale(0.9)", // 点击时按钮缩小
          borderColor: "teal.800", // 可选：添加边框加深效果
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default IntroOverlay;