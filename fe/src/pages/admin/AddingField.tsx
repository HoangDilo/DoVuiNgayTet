import React from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./AdminPage.module.scss";
import { IQuestion } from "../../type/admin";
import { createQuestion } from "../../api/admin";

export default function AddingField({
  isAdding,
  setIsAdding,
  onAddNew
}: {
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  onAddNew: () => void;
}) {
  const [addingQuestion, setAddingQuestion] = useState<IQuestion>({
    questionText: "",
    answers: [
      {
        answer: "",
        isCorrect: false,
      },
      {
        answer: "",
        isCorrect: false,
      },
      {
        answer: "",
        isCorrect: false,
      },
      {
        answer: "",
        isCorrect: false,
      },
    ],
  });

  const addingInputRef = useRef<HTMLInputElement>(null);

  const handleChangeAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const prevQuestion = { ...addingQuestion } as IQuestion;
    prevQuestion.answers[index].answer = event.target.value;
    setAddingQuestion(prevQuestion);
  };

  const handleChangeCorrectAnswer = (index: number) => {
    const prevQuestion = { ...addingQuestion } as IQuestion;
    prevQuestion.answers.forEach((_, answerIndex) => {
      if (answerIndex === index) {
        prevQuestion.answers[answerIndex].isCorrect = true;
      } else {
        prevQuestion.answers[answerIndex].isCorrect = false;
      }
    });
    setAddingQuestion(prevQuestion);
  };

  const handleAddNew = async () => {
    const res = await createQuestion(
      localStorage.getItem("username")
        ? (localStorage.getItem("username") as string)
        : "",
      addingQuestion
    );
    if(res.status === 200) {
      setIsAdding(false)
      onAddNew();
    }
  };

  useEffect(() => {
    console.log(addingInputRef.current);
    
    addingInputRef.current?.focus();
  }, [isAdding]);

  useEffect(() => {
    console.log(addingQuestion);
  }, [addingQuestion]);

  return (
    <div className={styles["adding-field"]}>
      <div className={styles["adding-question"]}>
        <input
          type="text"
          className={styles["input-question"]}
          ref={addingInputRef}
          value={addingQuestion.questionText}
          placeholder="Nhập câu hỏi mới"
          onChange={(event) =>
            setAddingQuestion((prev) => ({
              ...prev,
              questionText: event.target.value,
            }))
          }
        />
        <div className={styles["actions"]}>
          <div className="save icon size-18" onClick={handleAddNew}></div>
          <div onClick={() => setIsAdding(false)}>Hủy</div>
        </div>
      </div>
      <div className={styles["adding-answers"]}>
        {[...Array(4).keys()].map((answer) => (
          <div className={styles["answer"]} key={answer}>
            <input
              type="radio"
              name="answer"
              className={styles["answer-radio"]}
              onChange={() => handleChangeCorrectAnswer(answer)}
            />
            <input
              type="text"
              className={styles["input-question"]}
              placeholder={`Nhập câu trả lời thứ ${answer + 1}`}
              onChange={(event) => handleChangeAnswer(event, answer)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
