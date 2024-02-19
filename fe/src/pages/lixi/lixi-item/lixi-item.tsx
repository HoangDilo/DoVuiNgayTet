import React, { useEffect, useState } from "react";
import "./lixi-item.scss";

interface LixiItemProps {
  x: number;
  onClick: () => void;
  onTransitionEnd: () => void;
}

export default function LixiItem(props: LixiItemProps) {
  const { x, onClick, onTransitionEnd } = props;
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
      💸
    </div>
  );
}
