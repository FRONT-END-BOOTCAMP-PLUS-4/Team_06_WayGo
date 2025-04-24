import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface ToastState {
  show: boolean;
  message: string;
  type: ToastType;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  show: false,
  message: "",
  type: "success",

  showToast: (message: string, type: ToastType) => {
    set({ show: true, message, type });

    // 3초 후 자동으로 토스트 숨기기
    setTimeout(() => {
      set({ show: false });
    }, 3000);
  },

  hideToast: () => set({ show: false }),
}));
