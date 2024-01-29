import React from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./AdminPage.module.scss";
import { IQuestion } from "../../type/admin";

export default function AddingField({
  isAdding,
  setIsAdding,
}: {
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [addingQuestion, setAddingQuestion] = useState<IQuestion>({
    questionText: "",
    answerList: [
      {
        answerText: "",
        isCorrect: false,
      },
      {
        answerText: "",
        isCorrect: false,
      },
      {
        answerText: "",
        isCorrect: false,
      },
      {
        answerText: "",
        isCorrect: false,
      },
    ],
  });

  const addingInputRef = useRef<HTMLInputElement>(null);

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const prevQuestion = {...addingQuestion} as IQuestion;
    prevQuestion.answerList[index].answerText = event.target.value;
    setAddingQuestion(prevQuestion)
  }

  useEffect(() => {
    addingInputRef.current?.focus();
  }, [isAdding]);

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
          <div className="save icon size-18"></div>
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
            />
            <input
              type="text"
              className={styles["input-question"]}
              ref={addingInputRef}
              placeholder={`Nhập câu trả lời thứ ${answer + 1}`}
              onChange={(event) => handleChangeAnswer(event, answer)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
