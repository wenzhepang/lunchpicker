import { Box, Button, Container, Flex, HStack, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaLeaf, FaStar, FaUtensils, FaCog, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <Container
      maxW="1920px"
      px={4}
      bgGradient="linear(to-r, #fffbe9, #f7efe5, #f3e9dd)"
      boxShadow="md"
      borderRadius="xl"
    >
      <Flex
        justify="space-between"
        align="center"
        flexDir={{ base: "column", sm: "row" }}
        py={3}
      >
        <Box>
          <HStack spacing={4} color="green.500">
            <Icon as={FaLeaf} boxSize={6} />
            <Icon as={FaStar} boxSize={6} />
            <Icon as={FaUtensils} boxSize={6} />
          </HStack>
        </Box>

        <HStack spacing={4} mt={{ base: 3, sm: 0 }}>
          <Button
            as={RouterLink}
            to="/"
            leftIcon={<FaUtensils />}
            bg="#fff7e6"
            color="#7c6f57"
            fontWeight="bold"
            borderRadius="full"
            boxShadow="sm"
            _hover={{
              bg: "#ffe7ba",
              color: "#bfa76a",
              boxShadow: "md",
              transform: "scale(1.05)",
            }}
            _active={{
              bg: "#ffe7ba",
              color: "#a68a5b",
              transform: "scale(0.97)",
            }}
            transition="all 0.2s"
          >
            Home
          </Button>
          <Button
            as={RouterLink}
            to="/manage"
            leftIcon={<FaCog />}
            bg="#fff7e6"
            color="#7c6f57"
            fontWeight="bold"
            borderRadius="full"
            boxShadow="sm"
            _hover={{
              bg: "#ffe7ba",
              color: "#bfa76a",
              boxShadow: "md",
              transform: "scale(1.05)",
            }}
            _active={{
              bg: "#ffe7ba",
              color: "#a68a5b",
              transform: "scale(0.97)",
            }}
            transition="all 0.2s"
          >
            Food
          </Button>
          <Button
            as={RouterLink}
            to="/about"
            leftIcon={<FaInfoCircle />}
            bg="#fff7e6"
            color="#7c6f57"
            fontWeight="bold"
            borderRadius="full"
            boxShadow="sm"
            _hover={{
              bg: "#ffe7ba",
              color: "#bfa76a",
              boxShadow: "md",
              transform: "scale(1.05)",
            }}
            _active={{
              bg: "#ffe7ba",
              color: "#a68a5b",
              transform: "scale(0.97)",
            }}
            transition="all 0.2s"
          >
            About
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;