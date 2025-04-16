import Image from "next/image";
import styles from "./complete.module.scss";
import Button from "@/components/button/Button";
const CompletePlan: React.FC = () => {
  return (
    <div className={styles["complete-container"]}>
      <div className={styles["complete-text"]}>
        {"여행 계획이 작성되었어요! 🥳"}
      </div>
      <Image
        src={"/logos/char-success.svg"}
        alt="success image"
        width={224}
        height={156}
      />
      <div className={styles["action-container"]}>
        <Button size="large" type="lined" label="메인으로" />
        <Button size="large" type="default" label="내 계획으로" />
      </div>
    </div>
  );
};

export default CompletePlan;
