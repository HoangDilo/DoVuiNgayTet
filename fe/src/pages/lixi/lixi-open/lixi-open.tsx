import React, { useEffect, useRef, useState } from "react";

import Lixi from "@/constants/material.lixi";

import './lixi-open.scss'

interface ILixiOpenProps {
  chosenLixiIndex: number;
}

export default function LixiOpen(props: ILixiOpenProps) {
  const { chosenLixiIndex } = props;

  const [money, setMoney] = useState();

  const moneys = useRef({
    "1": "",
    "2": "",
    "5": "",
    "10": "",
    "20": "",
    "50": "",
    "100": "",
    "200": "",
    "500": ""
  })

  useEffect(() => {
    //fetch random lixi api
  }, []);

  return (
    <div className="lixi-open-screen">
      <img className="lixi-envelop" src={Lixi[chosenLixiIndex]} draggable={false}></img>
      <img src={money} />
    </div>
  );
}
