"use client";
import { FieldError } from "react-hook-form";
import styles from "./inputError.module.scss";

interface InputErrorProps {
  target?: FieldError | { message: string };
  success?: string;
  type?: "error" | "success";
}

const InputError = ({ target, success, type = "error" }: InputErrorProps) => {
  if (type === "success" && success) {
    return (
      <p className={styles["success-msg"] || "text-green-500"}>{success}</p>
    );
  }

  if (type === "error" && target) {
    return <p className={styles["error-msg"]}>{target.message}</p>;
  }

  return null;
};

export default InputError;
