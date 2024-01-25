import {useState, useEffect} from 'react'
import './HomePage.scss'
import Button from '../../components/common/Button/Button'

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
  const handleSubmit = () => {}
  return (
    <div className="home-background">
      <div className="home-roll">
        <div className="home-question-container-wrapper">
          <div className="home-left-roll"></div>
          <div className={`home-question-container ${ !isMounted ? "home-roll-close" : "home-roll-open"}`}></div>
          <div className="home-right-roll"></div>
        </div>
      </div>
      <div className="home-answers">
      <Button label={``} type="chit" onSubmit={handleSubmit}/>
      <Button label={``} type="chit" onSubmit={handleSubmit}/>
      <Button label={``} type="chit" onSubmit={handleSubmit}/>
      <Button label={``} type="chit" onSubmit={handleSubmit}/>
      </div>
    </div>
  )
}
