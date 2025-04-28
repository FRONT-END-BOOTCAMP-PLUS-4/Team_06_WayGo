// zustand 상태 관리 : 상태 업데이트 / 초기화
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isTokenValid } from "utils/jwt";

interface AuthState {
  id: string | null;
  email: string | null;
  name: string | null;
  nickname: string | null;
  profileImage: string | null;
  createdAt: Date | null;
  token: string | null;

  setId: (id: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setNickname: (nickname: string) => void;
  setProfileImage: (profileImage: string) => void;
  setCreatedAt: (createdAt: Date) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

// localStorage는 클라이언트 환경에서만 접근 가능
const storage =
  typeof window !== "undefined"
    ? {
        getItem: (name: string) => localStorage.getItem(name),
        setItem: (name: string, value: string) =>
          localStorage.setItem(name, value),
        removeItem: (name: string) => localStorage.removeItem(name),
      }
    : { getItem: () => null, setItem: () => null, removeItem: () => null };

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      id: null,
      email: null,
      name: null,
      nickname: null,
      profileImage: null,
      createdAt: null,
      token: null,

      setId: (id) => set({ id }),
      setEmail: (email) => set({ email }),
      setName: (name) => set({ name }),
      setNickname: (nickname) => set({ nickname }),
      setProfileImage: (profileImage) => set({ profileImage }),
      setCreatedAt: (createdAt) => set({ createdAt }),
      setToken: (token) => set({ token }),

      clearAuth: () =>
        set({
          id: null,
          email: null,
          name: null,
          nickname: null,
          profileImage: null,
          createdAt: null,
          token: null,
        }),
      isAuthenticated: () => {
        const token = get().token;
        if (!token) {
          return false;
        }

        // 토큰 만료 여부 확인
        const valid = isTokenValid(token);

        // 토큰이 만료되었다면 인증 정보 초기화
        if (!valid && token) {
          get().clearAuth();
        }

        return valid;
      },
    }),
    {
      name: "auth-storage", // 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => storage), // 커스텀 스토리지 사용
      // 새로고침 시 복원할 상태 필드 지정
      partialize: (state) => ({
        id: state.id,
        email: state.email,
        name: state.name,
        nickname: state.nickname,
        profileImage: state.profileImage,
        createdAt: state.createdAt ? state.createdAt.toISOString() : null,
        token: state.token,
      }),
      // 스토리지에서 가져온 값 처리 (날짜 객체 복원 등)
      onRehydrateStorage: () => (state) => {
        if (state && state.createdAt) {
          state.createdAt = state.createdAt ? new Date(state.createdAt) : null;
        }
      },
    }
  )
);
