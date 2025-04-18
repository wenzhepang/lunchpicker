import { Input, Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, Menu, Portal } from "@chakra-ui/react"
import { BASE_URL } from "@/App";

const FoodFilter = ({ onFilterChange }) => {
  const [value, setValue] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [orderByTimes, setOrderByTimes] = useState(false); // 新增状态

  const handleChange = (e) => {
    setValue(e.target.value);
    onFilterChange({
      keyword: e.target.value,
      favorites: showFavorites,
      order: orderByTimes ? 'times_desc' : ''
    });
  };

  const handleFavoriteToggle = () => {
    const newShowFavorites = !showFavorites;
    setShowFavorites(newShowFavorites);
    onFilterChange({
      keyword: value,
      favorites: newShowFavorites,
      order: orderByTimes ? 'times_desc' : ''
    });
  };

  const handleOrderToggle = () => {
    const newOrderByTimes = !orderByTimes;
    setOrderByTimes(newOrderByTimes);
    onFilterChange({
      keyword: value,
      favorites: showFavorites,
      order: newOrderByTimes ? 'times_desc' : ''
    });
  };

  return (
    <Box mb={4} display="flex" justifyContent="center" alignItems="center">
      <Input
        placeholder="Search food name..."
        value={value}
        onChange={handleChange}
        maxW="150px"
        transition="border 0.3s, box-shadow 0.3s"
        borderWidth="2px"
        borderColor="gray.200"
        _focus={{
          borderColor: "yellow.400",
          boxShadow: "0 0 0 3px rgba(251, 211, 61, 0.5)",
        }}
      />
      <Button
        aria-label="Show favorites"
        onClick={handleFavoriteToggle}
        bg={showFavorites ? "#ffe7ba" : "#fff7e6"}
        color={showFavorites ? "#bfa76a" : "#7c6f57"}
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
        ml={4}
      >
        My Favorites
      </Button>
      <Button
        aria-label="Order by times eaten"
        onClick={handleOrderToggle} // 使用新的处理函数
        bg={orderByTimes ? "#ffe7ba" : "#fff7e6"} // 根据状态切换高亮
        color={orderByTimes ? "#bfa76a" : "#7c6f57"}
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
        ml={4}
      >
        Order
      </Button>
    </Box>
  );
};

export default FoodFilter;