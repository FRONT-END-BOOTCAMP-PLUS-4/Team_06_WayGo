import React from "react";
import styles from "./button.module.scss";

type ButtonSize = "large" | "medium" | "small";
type ButtonType = "default" | "lined" | "disabled" | "delete";

interface ButtonProps {
  label: string;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  size = "large",
  type = "default",
  onClick,
}) => {
  const isDisabled = type === "disabled";

  const className = [
    styles.button,
    styles[size] ?? styles.large,
    styles[type] ?? styles.default,
  ].join(" ");

  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default Button;
