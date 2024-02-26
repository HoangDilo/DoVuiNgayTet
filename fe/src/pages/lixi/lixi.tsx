import React, { useEffect, useState } from "react";
import LixiItem from "./lixi-item/lixi-item";
import LixiOpen from "./lixi-open/lixi-open";
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
  const [chosenLixiId, setChosenLixiId] = useState<number>();
  const [chosenLixiIndex, setChosenLixiIndex] = useState<number>();

  const generateRandomX = () => Math.random() * window.innerWidth;

  const randomLixi = () => {
    return Math.floor(Math.random() * 7);
  };

  const randomSize = () => {
    return Math.floor(Math.random() * 30) + 30;
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

  const handleClickLixi = (id: number, lixiIndex: number) => {
    setChosenLixiId(id);
    setChosenLixiIndex(lixiIndex);
  }

  useEffect(() => {
    if(!(chosenLixiIndex || chosenLixiIndex === 0)) {
      const interval = setInterval(() => {
        generateNewLixi();
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }
  }, [lixi]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLixi(prev => prev.filter(lixi => lixi.id !== chosenLixiId));
    }, 745);

    return () => clearTimeout(timeout)
  }, [chosenLixiId])

  return (
    <div className="lixi-background">
      {lixi.map(({ id, x, lixiIndex, size, direction }) => (
        <LixiItem
          key={id}
          x={x}
          onClick={!chosenLixiId ? (() => handleClickLixi(id, lixiIndex)) : undefined}
          onTransitionEnd={() => handleDeleteLixi(id)}
          lixiIndex={lixiIndex}
          size={size}
          direction={direction}
          isChosen={chosenLixiId === id}
        />
      ))}
      {(chosenLixiIndex || chosenLixiIndex === 0) && <LixiOpen chosenLixiIndex={chosenLixiIndex}/>}
    </div>
  );
}
