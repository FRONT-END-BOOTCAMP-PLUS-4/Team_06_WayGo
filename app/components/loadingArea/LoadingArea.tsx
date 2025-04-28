"use client";
import styles from "./loadingArea.module.scss";

const LoadingArea = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default LoadingArea;
