import { useState, useEffect, useRef } from "react";
import "./BestWish.scss";
import HoaItem from "./hoa-item";

export default function BestWishPage() {
  const [hoa, setHoa] = useState<
    {
      id: number;
      x: number;
    }[]
  >([]);

  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handlePlayAudio = () => {
    audioRef.current?.play();
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
        <div className="best-wish-text-top">Chúc tết ý nghĩa:</div>
        <div className="best-wish-text-mid">Chúc bạn khỏe</div>
        <div className="best-wish-text-bot">
          Follow page DuRiu để cập nhật các thông tin mới nhất về ngành IT
        </div>
        <span onClick={handlePlayAudio} className="play-button">Mở nhạc Tết</span>
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
      <audio autoPlay ref={audioRef} className="audio">
        <source src="/conbietxuannaymechotinjuan.mp3" />
      </audio>
    </div>
  );
}
