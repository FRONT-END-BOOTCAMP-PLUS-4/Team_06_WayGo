"use client";
import Image from "next/image";
import styles from "./fileBox.module.scss";
import { useDropzone } from "react-dropzone";
import { useEffect, useRef, useState } from "react";

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

  interface FileWithPreview extends File {
    preview: string;
  }

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: multiple,
    maxFiles: maxFiles,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles["thumb-inner"]}>
        <Image
          alt={file.name}
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          fill
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className={styles["filebox-container"]}>
      <p>{label}</p>
      {files?.length === 0 ? (
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
      ) : (
        <aside>
          <ul className={styles["thumbs-container"]}>{thumbs}</ul>
        </aside>
      )}
    </section>
  );
};

export default FileBox;
