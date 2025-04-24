"use client";

import React, { useEffect, useState } from "react";
import Toast from "@/components/toast/Toast";
import { useToastStore } from "stores/toastStore";

/**
 * 전역 토스트 메시지 컴포넌트
 * 애플리케이션 어디서든 사용 가능한 토스트 메시지를 표시합니다.
 */
const GlobalToast = () => {
  const { show, message, type, hideToast } = useToastStore();
  const [isRendered, setIsRendered] = useState(false);

  // show 상태가 변경될 때 렌더링 상태 처리
  useEffect(() => {
    if (show) {
      setIsRendered(true);
    } else {
      // show가 false가 되어도 바로 DOM에서 제거하지 않고
      // 애니메이션이 끝날 때까지 기다림
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  // show가 false이고 렌더링도 중지되었을 때만 null 반환
  if (!show && !isRendered) {
    return null;
  }

  return <Toast message={message} type={type} onClose={hideToast} />;
};

export default GlobalToast;
