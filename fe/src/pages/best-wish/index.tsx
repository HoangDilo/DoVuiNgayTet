import React, { useState, useEffect } from "react";
import "./BestWish.scss";
import HoaItem from "./hoa-item";

export default function BestWishPage() {
  const [hoa, setHoa] = useState<
    {
      id: number;
      x: number;
    }[]
  >([]);

  const generateRandomX = () => Math.random() * window.innerWidth;

  const generateNewHoa = () => {
    const newHoa = [
      ...hoa,
      {
        id: Date.now(),
        x: generateRandomX(),
      },
    ];
    setHoa(newHoa);
  };

  const handleDeleteHoa = (id: number) => {
    const updatedHoa = hoa.filter((item) => item.id !== id);
    setHoa(updatedHoa);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateNewHoa();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [hoa]);

  return (
    <div className="best-wish-background">
      <div className="best-wish-text">
        <div className="best-wish-text-top">sech sech sech</div>
        <div className="best-wish-text-mid">skibidi dom dom yes yes</div>
        <div className="best-wish-text-bot">sech sech sech</div>
      </div>
      <div className="hoa-roi">
        <div className="hoa">
          {hoa.map(({ id, x }) => (
            <HoaItem
              x={x}
              key={id}
              onTransitionEnd={() => handleDeleteHoa(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
