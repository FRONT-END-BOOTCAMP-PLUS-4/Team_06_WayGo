import React from "react";
import styles from "./Button.module.scss";

type ButtonSize = "Large" | "Medium" | "Small";
type ButtonType =
  | "default"
  | "hover"
  | "active"
  | "lined"
  | "disabled"
  | "delete";

interface ButtonProps {
  label: string;
  size?: ButtonSize;
  type?: ButtonType;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  size = "Large",
  type = "default",
  onClick,
}) => {
  const isDisabled = type === "disabled";

  const className = `
    ${styles.button}
    ${styles[size]}
    ${styles[type]}
  `.trim();

  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default Button;
