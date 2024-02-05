import React, { useEffect, useRef, useState } from "react";

import { IQuestion } from "../../type/admin";

import styles from "./AdminPage.module.scss";
import { deleteQuestion, editQuestion } from "../../api/admin";
import ConfirmModal from "../../components/common/Modal/ConfirmModal";

export default function QuestionDropDown({
  question,
  setListQuestion,
}: {
  question: IQuestion;
  setListQuestion: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}) {
  const [isOpenAnswers, setIsOpenAnswer] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoneEditing = () => {
    setIsEditing(false);
    editQuestion(
      localStorage.getItem("username")
        ? (localStorage.getItem("username") as string)
        : "",
      question.questionId as number,
      questionText
    );
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      handleDoneEditing();
    }
  };

  const handleDelete = () => {
    setListQuestion((prev) =>
      prev.filter((qst) => qst.questionId !== question.questionId)
    );
    deleteQuestion(
      localStorage.getItem("username")
        ? (localStorage.getItem("username") as string)
        : "",
      question.questionId as number
    );
  };

  const handleEditCorrectAnswer = () => {

  }

  useEffect(() => {
    setQuestionText(question.questionText);
  }, [question]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className={styles["question-dropdown"]}>
      <div className={styles["question"]}>
        {isEditing ? (
          <input
            type="text"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event.key)}
            className={styles["input-question"]}
            ref={inputRef}
          />
        ) : (
          <span className={styles["question-label"]}>{questionText}</span>
        )}
        <div className={styles["actions"]}>
          {isEditing ? (
            <div
              className="save size-18 icon"
              onClick={handleDoneEditing}
            ></div>
          ) : (
            <div
              className={`pen size-16 icon`}
              onClick={() => setIsEditing(true)}
            ></div>
          )}
          <div
            className="trash-can size-16 icon"
            onClick={() => setIsOpenConfirmModal(true)}
          ></div>
          <div
            className={`detail size-20 icon`}
            onClick={() => {
              setIsOpenAnswer(!isOpenAnswers);
            }}
          ></div>
        </div>
      </div>
      {isOpenAnswers && (
        <div className={styles['answers-list-container']}>
          {question.answers.map((answer) => (
            <div key={answer.answerId} className={styles["answers"]}>
              <input
                type="radio"
                name={`anwers-list-${question.questionId}`}
                className={styles["answer-radio"]}
                defaultChecked={answer.isCorrect}
                onChange={handleEditCorrectAnswer}
              />
              <span className={styles['answer-row']}>{answer.answerText}</span>
            </div>
          ))}
        </div>
      )}
      {isOpenConfirmModal && (
        <ConfirmModal
          title={`Xóa câu hỏi!`}
          content={
            "Bạn có chắc bạn muốn xóa câu hỏi này không? Mọi câu trả lời liên quan đề sẽ bị xóa theo!"
          }
          onAccept={handleDelete}
          setIsOpen={setIsOpenConfirmModal}
        />
      )}
    </div>
  );
}
