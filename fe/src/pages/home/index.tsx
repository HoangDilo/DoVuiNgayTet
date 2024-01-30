import { useState, useEffect } from 'react'
import './HomePage.scss'
import Button from '../../components/common/Button/Button'

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = () => { }
  return (
    <div className="home-background">
      <div className="home-roll">
        <div className="home-question-container-wrapper">
          <div className="home-left-roll"></div>
          <div className={`home-question-container ${!isMounted ? "home-roll-close" : "home-roll-open"}`}>
            <div className="home-questions">
              <p className="home-question-text">
                {question}
                Anh nao dep trai oach xa lach dang cap vcl nhin phat xuat luon nhat tren the gioi? Anh nao dep trai oach xa lach dang cap vcl nhin phat xuat luon nhat tren the gioi?  Anh nao dep trai oach xa lach dang cap vcl nhin phat xuat luon nhat tren the gioi? Anh nao dep trai oach xa lach dang cap vcl nhin phat xuat luon nhat tren the gioi? 
              </p>
            </div>
            <div className="home-answers">
              <Button label={`Anh Theng`} type="chit" onSubmit={handleSubmit} />
              <Button label={`Anh Hoeng`} type="chit" onSubmit={handleSubmit} />
              <Button label={`Anh Juan`} type="chit" onSubmit={handleSubmit} />
              <Button label={`Anh Then`} type="chit" onSubmit={handleSubmit} />
            </div>
          </div>
          <div className="home-right-roll"></div>
        </div>
      </div>
    </div>
  )
}
