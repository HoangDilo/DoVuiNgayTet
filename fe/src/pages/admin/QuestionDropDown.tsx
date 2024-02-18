import React, { useEffect, useRef, useState } from "react";

import { IAnswer, IQuestion } from "../../type/admin";

import styles from "./AdminPage.module.scss";
import {
  deleteQuestion,
  editAnswer,
  editQuestion,
  getAllQuestion,
} from "../../api/admin";
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
  const [answersInternal, setAnswersInternal] = useState<
    [IAnswer, IAnswer, IAnswer, IAnswer] | null
  >(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const editingAnswerIndex = useRef<number>(-1);

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

  const handleEditCorrectAnswer = async (answerId: number) => {
    const resEdit = await editAnswer(
      localStorage.getItem("username") as string,
      answerId,
      question.answers.find((as) => as.answerId === answerId)
        ?.answerText as string,
      true
    );
    if (resEdit.status === 200) {
      getAllQuestion().then((data) => setListQuestion(data));
    }
  };

  const handleChangeAnswerText = (
    event: React.ChangeEvent<HTMLInputElement>,
    answerIndex: number
  ) => {
    if (answersInternal) {
      console.log('riel');
      console.log(answerIndex);
      
      editingAnswerIndex.current = answerIndex;
      const prevAnswers = [...answersInternal] as typeof answersInternal;
      prevAnswers[answerIndex].answerText = event.target.value;
      setAnswersInternal(prevAnswers);
    }
  };

  useEffect(() => {
    setQuestionText(question.questionText);
    setAnswersInternal(question.answers);
  }, [question]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (editingAnswerIndex.current >= 0 && answersInternal) {
      const timeout = setTimeout(() => {
        editAnswer(
          localStorage.getItem("username") as string,
          answersInternal[editingAnswerIndex.current as number]
            .answerId as number,
          answersInternal[editingAnswerIndex.current as number].answerText,
          answersInternal[editingAnswerIndex.current as number].isCorrect
        );
      }, 300);

      return () => clearTimeout(timeout)
    }
  }, [answersInternal]);

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
        <div className={styles["answers-list-container"]}>
          {answersInternal &&
            answersInternal.map((answer, index) => (
              <div key={answer.answerId} className={styles["answers"]}>
                <input
                  type="radio"
                  name={`anwers-list-${question.questionId}`}
                  className={styles["answer-radio"]}
                  defaultChecked={answer.isCorrect}
                  onChange={() =>
                    handleEditCorrectAnswer(answer.answerId as number)
                  }
                />
                <input
                  type="text"
                  className={styles["answer-row"]}
                  value={answer.answerText}
                  onChange={(event) => handleChangeAnswerText(event, index)}
                />
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
