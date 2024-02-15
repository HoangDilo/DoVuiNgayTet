import React, { useEffect, useState } from "react";

import styles from "./AdminPage.module.scss";
import { IQuestion } from "../../type/admin";
import { getAllQuestion, isAdmin } from "../../api/admin";
import QuestionDropDown from "./QuestionDropDown";
import AddingField from "./AddingField";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const [list, setList] = useState<IQuestion[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const getAllQuestions = () => {
    getAllQuestion().then((data) => setList(data));
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <div className={styles["admin-screen"]}>
      <div className={styles["admin-container"]}>
        <p className={styles["admin-header"]}>
          <span className="icon size-28 admin"></span>
          <span>
            Chào mừng admin{" "}
            <span className={styles["admin-name"]}>
              {localStorage.getItem("username")}
            </span>
          </span>
        </p>
        <div className={styles["admin-body"]}>
          <p className={styles["title"]}>Danh sách các câu đố:</p>
          <div className={styles["list-wrapper"]}>
            <div className={styles["list-question"]}>
              {!!list.length &&
                list.map((question) => (
                  <QuestionDropDown
                    key={question.questionId}
                    question={question}
                    setListQuestion={setList}
                  />
                ))}
            </div>
            {isAdding && (
              <AddingField
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                onAddNew={getAllQuestions}
              />
            )}
          </div>
          {!isAdding && (
            <div
              className={styles["add-new"]}
              onClick={() => setIsAdding(true)}
            >
              Thêm mới
              <div className="plus icon size-16"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
