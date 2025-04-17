import { useState, useEffect } from "react";
import { Box, HStack, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/App";

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/foods`)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
      })
      .catch(error => {
        console.error("Failed to fetch foods:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Box p={8}>
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
          {foods.map(food => (
            <Box
              key={food.id}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              overflow="hidden"
              display="flex"
              width="90%"
              mb={6}
            >
              <Box
                as="img"
                src={`${BASE_URL}${food.image_url}`}
                alt={food.name}
                width="150px"
                height="150px"
                objectFit="cover"
              />
              <Box p={4} flex="1" minW="0">
                <Box fontSize="lg" fontWeight="bold" mb={1}>
                  {food.name}
                </Box>
                <Box mb={1}>
                  Liked: {food.liked ? "Yes" : "No"}
                </Box>
                <Box mb={3}>
                  Times you've eaten: {food.times_eaten}
                </Box>
                <Wrap spacing={4}>
                  <WrapItem>
                    <Box
                      as="button"
                      px={3}
                      py={1}
                      borderRadius="md"
                      bg="teal.400"
                      color="white"
                      fontSize="sm"
                      fontWeight="medium"
                      _hover={{ bg: "teal.500" }}
                    >
                      Favorite
                    </Box>
                  </WrapItem>
                  <WrapItem>
                    <Box
                      as="button"
                      px={3}
                      py={1}
                      borderRadius="md"
                      bg="red.400"
                      color="white"
                      fontSize="sm"
                      fontWeight="medium"
                      _hover={{ bg: "red.500" }}
                    >
                      Delete
                    </Box>
                  </WrapItem>
                </Wrap>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default FoodManagement;