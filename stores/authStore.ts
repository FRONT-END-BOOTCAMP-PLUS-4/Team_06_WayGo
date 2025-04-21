// zustand 상태 관리 : 상태 업데이트 / 초기화
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  name: string | null;
  nickname: string | null;
  profileImage: string | null;
  createdAt: Date | null;
  token: string | null;

  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setProfileImage: (profileImage: string) => void;
  setCreatedAt: (createdAt: Date) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      email: null,
      name: null,
      nickname: null,
      profileImage: null,
      createdAt: null,
      token: null,

      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setNickname: (nickname) => set({ nickname }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setCreatedAt: (createdAt) => set({ createdAt }),
      setToken: (token) => set({ token }),

      clearAuth: () =>
        set({
          email: null,
          name: null,
          nickname: null,
          profileImage: null,
          createdAt: null,
          token: null,
        }),
      isAuthenticated: () => !!get().token, // 토큰이 존재하면 인증된 상태
    }),
    { name: "auth-storage" } // 로컬스토리지에 저장
  )
);
