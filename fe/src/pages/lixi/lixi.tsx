import React, { useEffect, useState } from 'react';
import LixiItem from './lixi-item/lixi-item';
import './lixi.scss';

export default function Lixi() {
    const [lixi, setLixi] = useState<{ id: number; x: number }[]>([]);

    const generateRandomX = () => Math.random() * window.innerWidth;

    const handleLixiClick = (id: number) => {
        // Handle click logic here
        console.log(`Lucky money with ID ${id} clicked!`);
    };

    const generateNewLixi = () => {
        setLixi((previousLixi: typeof lixi) => {
            const previousLixiClone = [...previousLixi]
            previousLixiClone.push({ id: Date.now(), x: generateRandomX() })
            return previousLixiClone
        });
    };

    useEffect(() => { setInterval(() => { generateNewLixi(); console.log("generating");
     }, 1000) }, [])

    useEffect(() => {console.log(lixi)}, [lixi])

    return (
        <>
            <div className="lixi-background">
                {lixi.map(({ id, x }) => (
                    <LixiItem key={id} x={x} onClick={() => handleLixiClick(id)} />
                ))}
            </div>
        </>
    );
};