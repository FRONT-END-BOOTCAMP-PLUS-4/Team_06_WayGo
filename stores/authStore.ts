// zustand 상태 관리 : 상태 업데이트 / 초기화
import { create } from "zustand";
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

export const useAuthStore = create<AuthState>()((set, get) => ({
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
}));
