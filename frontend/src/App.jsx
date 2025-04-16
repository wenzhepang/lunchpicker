import { Button } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"

function App() {
  const [foods, setFoods] = useState([]);

  const getFoods = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/foods/");
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <>
      <h1>Hello</h1>

      {/* 显示食物列表 */}
      <div style={{ marginTop: "20px" }}>
        {foods.map((food) => (
          <div key={food.id} style={{ marginBottom: "10px" }}>
            <h2>{food.name}</h2>
            <p>分类：{food.category}</p>
            <img src={food.image_url} alt={food.name} width="120" />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;