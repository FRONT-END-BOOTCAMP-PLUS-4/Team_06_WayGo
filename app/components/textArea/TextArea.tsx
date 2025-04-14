import React, { useRef, useEffect } from "react";
import styles from "./textArea.module.scss";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = "텍스트를 입력해주세요.",
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 입력값이 바뀔 때마다 높이를 자동 조절
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // 높이 초기화
      textArea.style.height = `${textArea.scrollHeight}px`; // scrollHeight로 설정
    }
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      className={styles.textArea}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
