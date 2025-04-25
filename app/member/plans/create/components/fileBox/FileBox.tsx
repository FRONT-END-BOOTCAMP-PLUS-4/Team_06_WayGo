"use client";
import Image from "next/image";
import styles from "./fileBox.module.scss";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";

interface FileBoxProps {
  label?: string;
  multiple: boolean;
  name: string;
  maxFiles?: number;
  onFileSelect?: (files: FileList) => void;
}

const FileBox = ({
  label,
  multiple = true,
  name,
  maxFiles = 1,
  onFileSelect,
}: FileBoxProps) => {
  interface FileWithPreview extends File {
    preview: string;
  }

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
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

      const dataTransfer = new DataTransfer();
      acceptedFiles.forEach((file) => {
        dataTransfer.items.add(file);
      });
      onFileSelect?.(dataTransfer.files);
    },
  });

  const handleDeleteFile = (indexToDelete: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToDelete);
    setFiles(updatedFiles);

    // FileList 업데이트
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => {
      dataTransfer.items.add(file);
    });
    onFileSelect?.(dataTransfer.files);
  };

  const thumbs = files.map((file, index) => (
    <div className={styles.thumb} key={file.name}>
      <button
        type="button"
        className={styles["delete-button"]}
        onClick={() => handleDeleteFile(index)}
        aria-label="이미지 삭제"
      >
        <Image src="/icons/x-icon.svg" width={12} height={12} alt="삭제" />
      </button>
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
            {...getInputProps({
              name: name,
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
