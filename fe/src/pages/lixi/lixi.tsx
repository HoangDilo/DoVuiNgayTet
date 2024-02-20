import React, { useEffect, useRef, useState } from "react";
import LixiItem from "./lixi-item/lixi-item";
import "./lixi.scss";

export default function Lixi() {
  const [lixi, setLixi] = useState<{ id: number; x: number }[]>([]);
  const isGenerating = useRef(true);
  

  const generateRandomX = () => Math.random() * window.innerWidth;

  const generateNewLixi = () => {
    const newLixi = [...lixi, { id: Date.now(), x: generateRandomX() }];
    setLixi(newLixi);
  };

  const handleDeleteLixi = (id: number) => {
    const updatedLixi = lixi.filter((item) => item.id !== id);
    setLixi(updatedLixi);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateNewLixi();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lixi]);

  return (
    <div className="lixi-background">
      {lixi.map(({ id, x }) => (
        <LixiItem
          key={id}
          x={x}
          onClick={() => {}}
          onTransitionEnd={() => handleDeleteLixi(id)}
        />
      ))}
    </div>
  );
}
