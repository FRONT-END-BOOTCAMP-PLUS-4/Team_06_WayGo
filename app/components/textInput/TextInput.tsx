"use client";
import { ReactNode } from "react";
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
  register?: Record<string, any>;
  error?: FieldError;
  children?: ReactNode;
  readOnly?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={id}>{label}</label>
      <div className={styles[className]}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
        />
        {children}
        <InputError target={error} />
      </div>
    </div>
  );
};

export default TextInput;
