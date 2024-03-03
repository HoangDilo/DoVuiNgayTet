import { useState, useEffect } from "react";
import "./HomePage.scss";
import Button from "../../components/common/Button/Button";
import { answerQuestion, getRandomQuestion } from "../../api/game";
import { IQuestion } from "../../type/admin";
import { useNavigate } from "react-router-dom";
import NotifyModal from "@/components/common/Modal/NotifyModal";

export default function HomePage() {
  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modal, setModal] = useState({
    title: "",
    content: "",
  });
  const [isLose, setIsLose] = useState(false);

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

  const handleSubmit = async (index: number) => {
    if (questions.length) {
      const res = await answerQuestion(
        localStorage.getItem("username") as string,
        questions[currentIndex].questionId as number,
        questions[currentIndex].answers[index].answerId as number
      );
      if (res.status === 200) {
        setModal({
          title: "Chúc mừng",
          content:
            currentIndex === questions.length - 1
              ? "Chúc mừng, bạn đã trả lời hết câu hỏi, cũng rút lì xì nào!"
              : "Bạn đã trả lời đúng, tiếp tục nhé?",
        });
      } else {
        setIsLose(true);
        setModal({
          title: "Rất tiếc",
          content: "Bạn đã trả lời sai, hẹn gặp lại bạn vào lần sau",
        });
      }
      setIsOpenModal(true);
    }
  };

  const handleClickOK = () => {
    setIsOpenModal(false);
    if (isLose) navigate("/chuc-tet");
    else {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (currentIndex == questions.length - 1) {
        navigate("/lixi", {
          replace: true,
        });
      }
    }
  };

  return (
    <div className="home-background">
      <div className="home-roll">
        <div className="home-question-container-wrapper">
          <div className="home-left-roll"></div>
          {!!questions.length && (
            <div
              className={`home-question-container ${
                !isMounted ? "home-roll-close" : "home-roll-open"
              }`}
            >
              <span className="home-questions">
                {questions[currentIndex].questionText}
              </span>
              <div className="home-answers">
                {[...Array(4).keys()].map((item) => (
                  <span
                    onClick={() => handleSubmit(item)}
                    key={item}
                    className="answer-options"
                  >
                    {questions[currentIndex].answers[item].answerText}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="home-right-roll"></div>
        </div>
      </div>
      {isOpenModal && (
        <NotifyModal
          title={modal.title}
          content={modal.content}
          onOK={handleClickOK}
        />
      )}
    </div>
  );
}
