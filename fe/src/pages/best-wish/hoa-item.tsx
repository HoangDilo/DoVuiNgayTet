import React, { useState, useEffect } from "react";
import "./BestWish.scss";
import hoaTexture from "@/assets/hoa.png";

interface HoaItemProps {
    x: number;
    onTransitionEnd: () => void;
}

export default function HoaItem(props: HoaItemProps) {
    const {x, onTransitionEnd} = props
    const [isFalling, setIsFalling] = useState(false)

    useEffect(() => {
        setTimeout(() => {
          setIsFalling(true)
        }, 10)
      }, [])

  return (
    <>
      <div
        className={`hoa-item ${isFalling && "fall"}`}
        style={{ left: x }}
        onTransitionEnd={onTransitionEnd}
      >
        <img className="hoa-texture" src={hoaTexture} alt="sehc no cac" />
      </div>
    </>
  );
}
