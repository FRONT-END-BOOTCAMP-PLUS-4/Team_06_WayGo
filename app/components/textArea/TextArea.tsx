import React from "react";
import styles from "./textArea.module.scss";

interface TextAreaProps {
  label?: string;
  value: string;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  rows = 5,
  onChange,
  placeholder = "텍스트를 입력해주세요.",
}) => {
  return (
    <div>
      {label && <p className={styles["textarea-label"]}>{label}</p>}
      <textarea
        className={styles.textArea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
