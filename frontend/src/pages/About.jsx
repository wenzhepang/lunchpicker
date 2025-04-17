import { Box, Heading, Text } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
    <Box pt="80px" p={5}>
      <Heading mb={4}>关于我们</Heading>
      <Text>这是一个食物展示和管理系统的演示应用。</Text>
      {/* 更多关于页面内容 */}
    </Box>
    </>
  );
};

export default About;