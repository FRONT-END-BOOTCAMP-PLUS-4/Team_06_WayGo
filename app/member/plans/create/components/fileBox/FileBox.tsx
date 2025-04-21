"use client";
import Image from "next/image";
import styles from "./fileBox.module.scss";
import { useDropzone } from "react-dropzone";
import { useRef } from "react";

interface FileBoxProps {
  label?: string;
  multiple: boolean;
  required?: boolean;
  name: string;
  maxFiles?: number;
}

const FileBox = ({
  label,
  multiple = true,
  required = false,
  name,
  maxFiles = 1,
}: FileBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: multiple,
    maxFiles: maxFiles,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    onDrop: (incomingFiles) => {
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        inputRef.current.files = dataTransfer.files;
      }
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className={styles["filebox-container"]}>
      <p>{label}</p>
      <div className={`${styles.filebox} dropzone`} {...getRootProps()}>
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
          ref={inputRef}
          {...getInputProps({
            name: name,
            required: required,
          })}
        />
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default FileBox;
