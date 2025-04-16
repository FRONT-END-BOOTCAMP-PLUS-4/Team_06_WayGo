"use client";
import Image from "next/image";
import styles from "./fileBox.module.scss";

interface FileBoxProps {
  label?: string;
  multiple?: boolean;
}

const FileBox = ({ label, multiple = true }: FileBoxProps) => {
  return (
    <section className={styles["filebox-container"]}>
      <p>{label}</p>
      <div className={styles.filebox}>
        <div>
          <Image
            src="/icons/upload-icon.svg"
            width={40}
            height={40}
            alt="이미지 파일 업로드"
          />
          <p className={styles["filebox-text"]}>
            이미지를 드래그하거나 클릭하여 업로드
          </p>
          <p className={styles["filebox-caption"]}>
            PNG, JPG, JPEG (최대 10MB)
          </p>
        </div>
        <label htmlFor="main-image">이미지 선택</label>
        <input
          id="main-image"
          type="file"
          accept=".png, .jpg, .jpeg"
          multiple={multiple}
        />
      </div>
    </section>
  );
};

export default FileBox;
