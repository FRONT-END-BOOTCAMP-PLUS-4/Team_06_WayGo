"use client";

import React, { useEffect, useState } from "react";
import styles from "./toast.module.scss";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // 애니메이션 완료 후 onClose 호출
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default Toast;
