"use client";
import { ChangeEvent, ReactNode, KeyboardEvent } from "react";
import { FieldError } from "react-hook-form";
import styles from "./textInput.module.scss";
import InputError from "@/components/inputError/InputError";

interface TextInputProps {
  className?: string;
  label?: string;
  labelSize?: string;
  id: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  register?: Record<string, unknown>;
  error?: FieldError;
  children?: ReactNode;
  readOnly?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

const TextInput = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  children,
  readOnly = false,
  className = "input-field",
  onChange,
  value,
  onEnter,
}: TextInputProps) => {
  // 엔터키 처리 핸들러
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // 기본 동작 방지
      e.preventDefault();

      // onEnter 함수가 있으면 호출
      if (onEnter) {
        onEnter();
      }
    }
  };

  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id}>{label}</label>
      <div className={styles[className]}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          onKeyDown={handleKeyDown}
        />
        {children}
      </div>
      <InputError target={error} />
    </div>
  );
};

export default TextInput;
