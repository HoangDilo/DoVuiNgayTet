import { useEffect, useRef, useState } from "react";

import Lixi from "@/constants/material.lixi";

import "./lixi-open.scss";
import { getRandomLixi } from "@/api/game";
import { useNavigate } from "react-router-dom";

interface ILixiOpenProps {
  chosenLixiIndex: number;
}

export default function LixiOpen(props: ILixiOpenProps) {
  const { chosenLixiIndex } = props;

  const navigate = useNavigate();

  const [money, setMoney] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isDisapear, setIsDisapear] = useState(false);

  const moneysObj = useRef({
    "1000":
      "https://upload.wikimedia.org/wikipedia/vi/d/d0/%C4%90%E1%BB%93ng_b%E1%BA%A1c_100_%C4%91%E1%BB%93ng.jpg",
    "2000":
      "https://upload.wikimedia.org/wikipedia/vi/1/14/Gi%E1%BA%A5y_b%E1%BA%A1c_2000_%C4%91%E1%BB%93ng.jpg",
    "5000":
      "https://upload.wikimedia.org/wikipedia/vi/d/de/Gi%E1%BA%A5y_b%E1%BA%A1c_5000_%C4%91%E1%BB%93ng.jpg",
    "10000":
      "https://gonatour.vn/vnt_upload/news/05_2020/tien_10000_dong_viet_nam.jpg",
    "20000":
      "https://gonatour.vn/vnt_upload/news/05_2020/tien_20000_dong_viet_nam.jpg",
    "50000":
      "https://gonatour.vn/vnt_upload/news/05_2020/tien_50000_dong_viet_nam.jpg",
    "100000":
      "https://gonatour.vn/vnt_upload/news/05_2020/tien_100000_dong_viet_nam.jpg",
    "200000":
      "https://gonatour.vn/vnt_upload/news/05_2020/tien_200000_dong_viet_nam.jpg",
    "500000":
      "https://gonatour.vn/vnt_upload/news/05_2020/tien_500000_dong_viet_nam.jpg",
  });

  const handleOpenLixi = () => {
    if (money) {
      setIsOpen(true);
    }
  };

  const getRamdomLixi = async () => {
    const data = (await getRandomLixi(
      localStorage.getItem("username") as string
    )) as { money: number };

    setTimeout(() => {
      setMoney(data.money);
    }, 1250);
  };

  useEffect(() => {
    //fetch random lixi api
    getRamdomLixi();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setIsDisapear(true);
      }, 950);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <div className="lixi-open-screen">
      <div className="lixi-open-container">
        {!isDisapear && (
          <img
            className={`lixi-envelop ${isOpen && "pop-out"}`}
            src={Lixi[chosenLixiIndex]}
            draggable={false}
            onClick={handleOpenLixi}
          ></img>
        )}
        {!!money && (
          <img
            src={
              money
                ? moneysObj.current[
                    `${money}` as keyof typeof moneysObj.current
                  ]
                : undefined
            }
            className="lixi-img"
          />
        )}
      </div>
      {isDisapear && (
        <>
          <span className="lixi-notification">
            Chúc mừng bạn đã nhận được {money} đồng, hãy liên hệ page{" "}
            <a href="https://www.facebook.com/duriu.team" target="blank">
              DuRiu
            </a>{" "}
            để nhận lì xì nhé! &gt;.&lt;
          </span>
          <span
            className="lixi-done lixi-notification"
            onClick={() =>
              navigate("/chuc-tet", {
                replace: true,
              })
            }
          >
            Xong
          </span>
        </>
      )}
    </div>
  );
}
