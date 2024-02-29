import styles from "./Modal.module.scss";
import Button from "../Button/Button";

interface INotifyModalProps {
  title: string;
  content: string;
  onOK: () => void;
}

export default function NotifyModal(props: INotifyModalProps) {
  const { title, content, onOK } = props;

  return (
    <div className={styles["notifymodal"]}>
      <div className={styles["main-modal"]}>
        <div className={styles['content-container']}>
          <p className={styles["title"]}>{title}</p>
          <span className={styles["content"]}>{content}</span>
        </div>
        <Button label="OK" onSubmit={onOK} />
      </div>
    </div>
  );
}
