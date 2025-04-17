import { Box, Button, Heading} from "@chakra-ui/react";

const IntroOverlay = ({ onDismiss }) => {
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
      <Heading
        fontSize={["3xl", "4xl", "5xl", "6xl"]}
        mb={6}
        textAlign="center"
        maxW="90%"
      >
        Hungry but undecided?
      </Heading>
      <Button
        size="lg"
        colorScheme="teal"
        onClick={onDismiss}
        transition="all 0.3s ease-in-out"
        _hover={{
          bg: "teal.500",
          color: "white",
          transform: "scale(1.1)",
        }}
        _active={{
          bg: "blue.600",
          transform: "scale(0.9)",
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default IntroOverlay;