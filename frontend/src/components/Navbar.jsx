import { Box, Button, Container, Flex, HStack, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaLeaf, FaStar, FaUtensils, FaCog, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <Container maxW="1920px" px={4} bg="gray.100" boxShadow="md">
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
            colorScheme="green"
          >
            Home
          </Button>
          <Button
            as={RouterLink}
            to="/manage"
            leftIcon={<FaCog />}
            colorScheme="green"
          >
            Food
          </Button>
          <Button
            as={RouterLink}
            to="/about"
            leftIcon={<FaInfoCircle />}
            colorScheme="green"
          >
            About
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;