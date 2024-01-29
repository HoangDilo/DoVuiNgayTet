import React, { useEffect, useState } from "react";

import styles from "./AdminPage.module.scss";
import { IQuestion } from "../../type/admin";
import { getAllQuestion } from "../../api/admin";
import QuestionDropDown from "./QuestionDropDown";
import AddingField from "./AddingField";

export default function Admin() {
  const [list, setList] = useState<IQuestion[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    getAllQuestion().then((data) => setList(data));
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
            {isAdding && <AddingField isAdding={isAdding} setIsAdding={setIsAdding}/>}
          </div>
          <div className={styles["add-new"]} onClick={() => setIsAdding(true)}>
            Thêm mới
            <div className="plus icon size-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
