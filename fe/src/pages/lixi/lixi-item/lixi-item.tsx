import React from 'react';
import './lixi-item.scss';

interface LixiItemProps {
  x: number;
  onClick: () => void;
}

export default function LixiItem(props: LixiItemProps) { // cai {x, onclick} la destructoring
    const {x, onClick} = props
    return (
    <div className="lixi-item" style={{ left: x }} onClick={onClick}>
      💸
    </div>
  );
};