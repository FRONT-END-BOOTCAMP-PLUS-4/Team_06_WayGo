"use client";
import { FieldError } from "react-hook-form";
import styles from "./inputError.module.scss";

interface InputErrorProps {
  target?: FieldError;
}

const InputError = ({ target }: InputErrorProps) => {
  if (!target) {
    return;
  }
  return <p className={styles["error-msg"]}>{target?.message}</p>;
};

export default InputError;
