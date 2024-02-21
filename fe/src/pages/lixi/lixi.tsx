import React, { useEffect, useState } from "react";
import LixiItem from "./lixi-item/lixi-item";
import "./lixi.scss";

export default function Lixi() {
  const [lixi, setLixi] = useState<
    {
      id: number;
      x: number;
      lixiIndex: number;
      size: number;
      direction: boolean;
    }[]
  >([]);

  const generateRandomX = () => Math.random() * window.innerWidth;

  const randomLixi = () => {
    return Math.floor(Math.random() * 6);
  };

  const randomSize = () => {
    return Math.floor(Math.random() * 20) + 40;
  };

  const randomDirection = () => {
    return !!Math.floor(Math.random() * 2);
  };

  const generateNewLixi = () => {
    const newLixi = [
      ...lixi,
      {
        id: Date.now(),
        x: generateRandomX(),
        lixiIndex: randomLixi(),
        size: randomSize(),
        direction: randomDirection(),
      },
    ];
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
      {lixi.map(({ id, x, lixiIndex, size, direction }) => (
        <LixiItem
          key={id}
          x={x}
          onClick={() => {}}
          onTransitionEnd={() => handleDeleteLixi(id)}
          lixiIndex={lixiIndex}
          size={size}
          direction={direction}
        />
      ))}
    </div>
  );
}
