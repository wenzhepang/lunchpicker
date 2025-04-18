import { Box, Heading, Text, Link } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <Box pt="80px" p={5} display="flex" flexDirection="column" alignItems="center" textAlign="center">
        <Heading mb={4}>About Us</Heading>
        <Text mb={4}>This is a demo application for food display and management.</Text>
        <Text mb={4}>
          Visit my GitHub repository:
          <Link href="https://github.com/UOA-CS732-S1-2025/cs732-assignment-wenzhepang" color="teal.500" isExternal>
            cs732-assignment-wenzhepang
          </Link>
        </Text>
        <Heading size="md" mb={2}>Local Running Process</Heading>
      </Box>
    </>
  );
};

export default About;