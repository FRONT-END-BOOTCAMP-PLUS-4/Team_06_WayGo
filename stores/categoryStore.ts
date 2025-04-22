import { create } from "zustand";
import { CategoryResponse } from "application/usecases/plans/dto/CategoryListDto";

interface CategoryState {
  categoryOptions: CategoryResponse;
  isFetched: boolean;
  fetchCategoryOptions: () => Promise<void>;
}

const CATEGORY_STORAGE_KEY = "categoryOptions";

export const useCategoryStore = create<CategoryState>((set) => ({
  categoryOptions: {
    season: [],
    duration: [],
    budget: [],
    location: [],
  },
  isFetched: false,

  fetchCategoryOptions: async () => {
    const stored = localStorage.getItem(CATEGORY_STORAGE_KEY);
    if (stored) {
      const parsed: CategoryResponse = JSON.parse(stored);
      set({ categoryOptions: parsed, isFetched: true });
      return;
    }

    // localStorage에 없으면 API 요청
    try {
      const res = await fetch("/api/category");
      if (!res.ok) {
        throw new Error("카테고리 데이터를 불러오지 못했습니다.");
      }

      const data: CategoryResponse = await res.json();

      set({ categoryOptions: data, isFetched: true });
      localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("카테고리 데이터 fetch 실패:", err);
    }
  },
}));
