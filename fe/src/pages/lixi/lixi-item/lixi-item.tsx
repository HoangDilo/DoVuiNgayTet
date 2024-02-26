import React, { useEffect, useState } from "react";
import "./lixi-item.scss";
import Lixi from "@/constants/material.lixi.ts";

interface LixiItemProps {
  x: number;
  onClick?: () => void;
  onTransitionEnd: () => void;
  lixiIndex: number;
  size: number;
  direction: boolean;
  isChosen?: boolean;
}

export default function LixiItem(props: LixiItemProps) {
  const { x, onClick, onTransitionEnd, lixiIndex, size, direction, isChosen } =
    props;
  const [isFalling, setIsFalling] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFalling(true);
    }, 10);
  }, []);

  return (
    <div
      className={`lixi-item ${isFalling && "fall"}`}
      style={{ left: x }}
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
    >
      <img
        className={`lixi-texture ${
          direction
            ? `spin-right ${isChosen && "fade-out"}`
            : `spin-left ${isChosen && "fade-out"}`
        }`}
        src={Lixi[lixiIndex]}
        style={{ width: `${size}px` }}
        draggable={false}
      />
    </div>
  );
}
