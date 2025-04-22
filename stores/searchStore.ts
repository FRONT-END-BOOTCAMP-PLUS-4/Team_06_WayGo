import { create } from "zustand";
import { Plan } from "domain/entities/Plan";

interface SearchState {
  keyword: string;
  results: Plan[];
  setKeyword: (k: string) => void;
  setResults: (r: Plan[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  keyword: "",
  results: [],
  setKeyword: (keyword) => set({ keyword }),
  setResults: (results) => set({ results }),
}));
