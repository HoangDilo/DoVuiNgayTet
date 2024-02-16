import { useState, useEffect } from "react";
import "./HomePage.scss";
import Button from "../../components/common/Button/Button";
import { getRandomQuestion } from "../../api/game";
import { IQuestion } from "../../type/admin";

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answer, setAnswer] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 750);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    getRandomQuestion(localStorage.getItem("username") as string).then(
      (data) => {
        setQuestions(data);
      }
    );
  }, []);

  const handleSubmit = () => {};
  return (
    <div className="home-background">
      <div className="home-roll">
        <div className="home-question-container-wrapper">
          <div className="home-left-roll"></div>
          {!!questions.length && <div
            className={`home-question-container ${
              !isMounted ? "home-roll-close" : "home-roll-open"
            }`}
          >
            <div className="home-questions">
              {questions[currentIndex].questionText}
            </div>
            <div className="home-answers">
              {[...Array(4).keys()].map(item => 
                <Button key={item} label={questions[currentIndex].answers[item].answerText} type="chit" onSubmit={handleSubmit} />
                )}
            </div>
          </div>}
          <div className="home-right-roll"></div>
        </div>
      </div>
    </div>
  );
}
