import React from "react";
import styles from "./textArea.module.scss";

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder = "텍스트를 입력해주세요.",
}) => {
  return (
    <div>
      <p className={styles["textarea-label"]}>{label}</p>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
      />
    </div>
  );
};

export default TextArea;
