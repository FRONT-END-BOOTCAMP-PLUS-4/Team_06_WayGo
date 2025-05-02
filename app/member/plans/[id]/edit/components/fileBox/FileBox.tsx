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
  initialImages?: Array<{
    id: number;
    imgUrl: string;
    isDefault: boolean;
  }>;
}

interface FileWithPreview extends File {
  preview: string;
  isExisting?: boolean; // 기존 이미지인지 구분하기 위한 플래그
  id?: number; // 기존 이미지의 ID 저장
}

const FileBox = ({
  label,
  multiple = true,
  name,
  maxFiles = 1,
  onFileSelect,
  initialImages = [],
}: FileBoxProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // 초기 이미지 설정
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const initialFiles = initialImages.map(
        (img) =>
          ({
            name: img.imgUrl.split("/").pop() || "image",
            preview: img.imgUrl,
            isExisting: true,
            id: img.id,
          }) as FileWithPreview
      );

      setFiles(initialFiles);
    }
  }, [initialImages]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multiple,
    maxFiles: maxFiles,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          isExisting: false,
        })
      );

      setFiles((prevFiles) => {
        // 기존 파일 중 isExisting인 것들은 유지
        const existingFiles = prevFiles.filter((f) => f.isExisting);
        return [...existingFiles, ...newFiles].slice(0, maxFiles);
      });

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

    // FileList 업데이트 - 새로 추가된 파일만 전달
    const dataTransfer = new DataTransfer();
    updatedFiles
      .filter((file) => !file.isExisting)
      .forEach((file) => {
        dataTransfer.items.add(file as File);
      });
    onFileSelect?.(dataTransfer.files);
  };

  const thumbs = files.map((file, index) => (
    <div className={styles.thumb} key={file.preview}>
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
          onLoad={() => {
            if (!file.isExisting) {
              URL.revokeObjectURL(file.preview);
            }
          }}
          fill
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files
        .filter((file) => !file.isExisting)
        .forEach((file) => URL.revokeObjectURL(file.preview));
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
