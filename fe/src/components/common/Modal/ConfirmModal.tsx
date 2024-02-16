import React from "react";

import styles from "./Modal.module.scss";

export default function ConfirmModal({
  title,
  content,
  onAccept,
  setIsOpen,
}: {
  title: string;
  content: string;
  onAccept: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={styles["confirm-modal-screen"]}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={styles["container"]}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <p className={styles["title"]}>{title}</p>
        <span className={styles["content"]}>{content}</span>
        <div className={styles["buttons"]}>
          <button className="button-2" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button className="button-1" onClick={onAccept}>
            OK
          </button>
        </div>
        <div
          className={`x icon size-24 ${styles.close}`}
          onClick={() => setIsOpen(false)}
        ></div>
      </div>
    </div>
  );
}
