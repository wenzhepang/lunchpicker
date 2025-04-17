// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CircularLunchPicker from "../components/CircularLunchPicker";
import IntroOverlay from "@/components/IntroOverlay";
const HomePage = () => {
    const BASE_URL = "http://127.0.0.1:5000";
    const containerRef = useRef(null);
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const [showIntro, setShowIntro] = useState(true);

    const getConfig = () => {
        const isMobile = window.innerWidth < 768;
        return {
            rowCount: isMobile ? 4 : 7,
            speed: 30,
            rotationRange: 10,
            spacing: isMobile ? 10 : 20,
            minItemWidth: isMobile ? 60 : 80
        };
    };

    const [config, setConfig] = useState(getConfig());
    const [foods, setFoods] = useState([]);
    const [displayFoods, setDisplayFoods] = useState([]);

    const handleResize = () => {
        setConfig(getConfig());
        if (foods.length > 0) {
            initDisplayFoods();
        }
    };

    const getFoods = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/foods/`);
            const data = await res.json();
            setFoods(data);
        } catch (err) {
            console.error("Failed to fetch foods:", err);
        }
    };

    const initDisplayFoods = () => {
        if (!containerRef.current || foods.length === 0) return;

        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const itemWidth = Math.max(
            config.minItemWidth,
            (containerWidth - (config.rowCount + 1) * config.spacing) / config.rowCount
        );

        const newDisplayFoods = [];
        const rows = Array(config.rowCount).fill(0);
        const usedFoodIndices = new Set();
        const itemsPerColumn = Math.ceil(containerHeight / itemWidth) + 1;
        const shuffledFoods = [...foods].sort(() => Math.random() - 0.5);

        rows.forEach((_, rowIndex) => {
            for (let i = 0; i < itemsPerColumn; i++) {
                let foodIndex = (rowIndex * itemsPerColumn + i) % shuffledFoods.length;
                let attempts = 0;

                while (usedFoodIndices.has(foodIndex)) {
                    foodIndex = (foodIndex + 1) % shuffledFoods.length;
                    attempts++;
                    if (attempts > shuffledFoods.length) break;
                }

                usedFoodIndices.add(foodIndex);
                const food = shuffledFoods[foodIndex];
                const rotation = (Math.random() * 2 - 1) * config.rotationRange;
                const initialY = containerHeight - (i * itemWidth);

                newDisplayFoods.push({
                    ...food,
                    id: `${rowIndex}-${i}-${Date.now()}`,
                    row: rowIndex,
                    y: initialY,
                    x: rowIndex * (itemWidth + config.spacing) + config.spacing,
                    width: itemWidth,
                    rotation
                });
            }
        });

        setDisplayFoods(newDisplayFoods);
    };

    const animate = (time) => {
        if (previousTimeRef.current === undefined) {
            previousTimeRef.current = time;
        }

        const deltaTime = (time - previousTimeRef.current) / 1000;
        previousTimeRef.current = time;

        setDisplayFoods(prev => {
            if (!containerRef.current) return prev;

            const containerHeight = containerRef.current.offsetHeight;
            const itemWidth = prev[0]?.width || 100;
            const speed = config.speed * deltaTime;

            return prev.map(item => {
                let newY = item.y - speed;
                if (newY < -itemWidth) {
                    newY = containerHeight;
                }
                return { ...item, y: newY };
            });
        });

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        getFoods();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        if (foods.length > 0) {
            initDisplayFoods();
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [foods, config]);

    return (

        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#f0f0f0"
            }}
        >
            {showIntro && <IntroOverlay onDismiss={() => setShowIntro(false)} />}
            
            {!showIntro && <Navbar />}
            {!showIntro && <CircularLunchPicker foods={foods} />}
            <Box
                pt="60px"
                h="calc(100vh - 60px)"
                overflow="auto"
                position="relative"
            >
                {displayFoods.map((food) => (
                    <div
                        key={food.id}
                        style={{
                            position: "absolute",
                            left: `${food.x}px`,
                            top: `${food.y}px`,
                            width: `${food.width}px`,
                            transform: `rotate(${food.rotation}deg)`,
                            willChange: "transform"
                        }}
                    >
                        <img
                            src={`${BASE_URL}${food.image_url}`}
                            alt={food.name}
                            style={{
                                width: "80%",
                                height: "auto",
                                display: "block",
                            }}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default HomePage;