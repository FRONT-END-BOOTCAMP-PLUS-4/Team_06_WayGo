import React from "react";
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
  return (
    <textarea
      className={styles.textArea}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={5}
    />
  );
};

export default TextArea;
