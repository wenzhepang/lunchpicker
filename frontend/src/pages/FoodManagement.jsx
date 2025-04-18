import { useState, useEffect } from "react";
import { Box, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import { BASE_URL } from "@/App";
import FoodFilter from "@/components/FoodFilter";

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [filter, setFilter] = useState({ keyword: "", favorites: false });

  const fetchFoods = () => {
    fetch(`${BASE_URL}/api/foods`)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
      })
      .catch(error => {
        console.error("Failed to fetch foods:", error);
      });
  };

  useEffect(() => {
    fetchFoods();
  }, []);


  const filteredFoods = foods
    .filter(food => {
      const matchKeyword = food.name.toLowerCase().includes((filter.keyword || "").toLowerCase());
      const matchFavorite = filter.favorites ? food.liked : true;
      return matchKeyword && matchFavorite;
    })
    .sort((a, b) => {
      if (filter.order === 'times_desc') {
        return b.times_eaten - a.times_eaten;
      }
      return 0; 
    });

  const toggleFavorite = (foodId, currentStatus) => {
    fetch(`${BASE_URL}/api/foods/${foodId}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked: !currentStatus }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update favorite status');
        return res.json();
      })
      .then(() => {
        setFoods(foods.map(food => 
          food.id === foodId ? { ...food, liked: !currentStatus } : food
        ));
        toaster.create({
          title: "Favorite Status Updated",
          description: !currentStatus ? "Added to favorites" : "Removed from favorites",
        });
      })
      .catch(error => {
        console.error("Failed to toggle favorite:", error);
        toaster.create({
          title: "Operation Failed",
          description: "Unable to update favorite status, please try again later",
        });
      });
  };

  const deleteFood = (foodId) => {
    fetch(`${BASE_URL}/api/foods/${foodId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete food');
        return res.json();
      })
      .then(() => {
        setFoods(foods.filter(food => food.id !== foodId));
        toaster.create({
          title: "Delete Successful",
          description: "Food has been successfully removed from the list",
        });
      })
      .catch(error => {
        console.error("Failed to delete food:", error);
        toaster.create({
          title: "Delete Failed",
          description: "Unable to delete food, please try again later",
        });
      });
  };

  return (
    <>
      <Navbar />
      <Box p={8}>
        <FoodFilter onFilterChange={setFilter} />
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="40px">
          {filteredFoods.map(food => (
            <Box
              key={food.id}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              overflow="hidden"
              display="flex"
              width="90%"
              mb={6}
              minW="300px"
            >
              <Box
                as="img"
                src={`${BASE_URL}${food.image_url}`}
                alt={food.name}
                width="150px"
                height="150px"
                objectFit="cover"
              />
              <Box p={4} flex="1" minW="0" position="relative">
                <Box 
                  fontSize="lg" 
                  fontWeight="bold" 
                  mb={1}
                >
                  {food.name}
                </Box>
                <Box mb={3}>
                  Times you've eaten: {food.times_eaten}
                </Box>
                <Wrap 
                  spacing={4} 
                  position="absolute" 
                  bottom="4" 
                  left="4" 
                  right="4" 
                  display="flex" 
                  justifyContent="flex-end"
                >
                  <WrapItem>
                    <Box
                      as="button"
                      borderRadius="full"
                      color="red.500"
                      fontSize="xl"
                      _hover={{ color: "red.600" }}
                      onClick={() => toggleFavorite(food.id, food.liked)}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="36px"
                      height="36px"
                    >
                      {food.liked ? <FaHeart /> : <FaRegHeart />}
                    </Box>
                  </WrapItem>
                  <WrapItem>
                    <Box
                      as="button"
                      borderRadius="full"
                      bg="red.400"
                      color="white"
                      fontSize="sm"
                      _hover={{ bg: "red.500" }}
                      onClick={() => deleteFood(food.id)}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="36px"
                      height="36px"
                    >
                      <FaTrash />
                    </Box>
                  </WrapItem>
                </Wrap>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Toaster />
    </>
  );
};

export default FoodManagement;