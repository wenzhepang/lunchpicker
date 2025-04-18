import React, { useState, useEffect, useRef } from "react";
import { CiCircleCheck } from "react-icons/ci";
import {
    Box,
    Button,
    Image,
    useBreakpointValue,
    Circle
} from "@chakra-ui/react";
import { BASE_URL } from "@/App";

const CircularLunchPicker = ({ foods }) => {
    const [isRolling, setIsRolling] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [rollCount, setRollCount] = useState(0);
    const intervalRef = useRef(null);
    const imageSize = useBreakpointValue({ base: 120, md: 150 });
    const containerSize = useBreakpointValue({ base: 300, md: 400 });
    const handleMarkEaten = async () => {
        const foodId = foods[selectedIndex].id;
        try {
          const res = await fetch(`${BASE_URL}/api/foods/${foodId}/eat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
      
          if (!res.ok) throw new Error("Failed to update food");
      
          console.log("Marked as eaten!");
          setConfirmed(true); 
        } catch (err) {
          console.error("Error:", err);
        }
      };

    const startRolling = () => {
        setIsRolling(true);
        setSelectedIndex(null);

        intervalRef.current = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * foods.length);
            setSelectedIndex(randomIndex);
        }, 100);
    };

    const stopRolling = () => {
        setIsRolling(false);
        clearInterval(intervalRef.current);

        const newCount = rollCount + 1;
        setRollCount(newCount);

        if (newCount >= 3 && !confirmed) {
            setConfirmed(true);
            console.warn("WHAT'S YOUR PROBLEM? JUST EAT THIS", foods[selectedIndex].name);
        }
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    if (confirmed) {
        return (
            <Box
                position="fixed"
                top="0"
                left="0"
                w="100vw"
                h="100vh"
                bg="rgba(0, 0, 0, 0.7)"
                zIndex={1100}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                color="white"
                textAlign="center"
            >
                <Image
                    src={`${BASE_URL}${foods[selectedIndex].image_url}`}
                    alt={foods[selectedIndex].name}
                    maxW="300px"
                    borderRadius="md"
                    boxShadow="xl"
                    mb={6}
                />
                <Box fontSize="4xl" fontWeight="bold">
                    {rollCount >= 3
                        ? `WHAT'S YOUR PROBLEM? JUST EAT THIS ${foods[selectedIndex].name}!`
                        : `Enjoy the ${foods[selectedIndex].name}!`}
                </Box>
            </Box>
        );
    }

    return (
        <Circle
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={1000}
            size={containerSize}
            bg="white"
            boxShadow="2xl"
            p={6}
            textAlign="center"
            flexDirection="column"
            justifyContent="center"
            border="8px solid"
            borderColor="teal.100"
            bgImage="url('/images/bg-circle.jpg')"  
            bgSize="cover"                          
            bgPosition="center"                  
        >
            <Box position="absolute" top="20px" left="0" right="0" textAlign="center">
                <Button
                    size="md"
                    // 奶油风按钮样式，和 Navbar 保持一致
                    bg="#fff7e6"
                    color="#7c6f57"
                    fontWeight="bold"
                    borderRadius="full"
                    boxShadow="sm"
                    transition="all 0.2s"
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
                    onClick={isRolling ? stopRolling : startRolling}
                >
                    {isRolling ? "Stop" : "Start"}
                </Button>
            </Box>
            <Box mt={20}>
                <Box
                    width={`${imageSize}px`}
                    height={`${imageSize}px`}
                    mb={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    mt={{ base: 0, md: 10 }}
                >
                    {selectedIndex !== null && (
                        <Image
                            src={`${BASE_URL}${foods[selectedIndex].image_url}`}
                            alt={foods[selectedIndex].name}
                            maxW="100%"
                            maxH="100%"
                            objectFit="contain"
                        />
                    )}
                </Box>
                <Box
                    textAlign="center"
                    mt={{ base: 0, md: 10 }} 
                >
                    {selectedIndex !== null && (
                        <Box as="h3" fontSize="lg" fontWeight="bold" mb={2} color="blue.900">
                            {foods[selectedIndex].name}
                        </Box>
                    )}
                </Box>
                <Box
                    mt={{ base: 0, md: 2 }}
                    display="flex"
                    justifyContent="center"
                    height="32px"
                >
                    {selectedIndex !== null && !isRolling && (
                        <Box
                            cursor="pointer"
                            _hover={{ color: "green.500" }}
                            onClick={handleMarkEaten}
                        >
                            <CiCircleCheck size={28} />
                        </Box>
                    )}
                </Box>
            </Box>
        </Circle>
    );
};

export default CircularLunchPicker;