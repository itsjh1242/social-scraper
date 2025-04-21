import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NaverStore {
  /**
   * @description 데이터 수집 진행률
   */
  progress: number;
  setProgress: (progress: number) => void;

  /**
   * @description 네이버 블로그 포스트 URL
   */
  blogPostUrl: string;
  setBlogPostUrl: (url: string) => void;
}

export const useNaverStore = create<NaverStore>()(
  persist(
    (set) => ({
      progress: 0,
      setProgress: (progress) => set({ progress }),

      blogPostUrl: "",
      setBlogPostUrl: (url) => set({ blogPostUrl: url }),
    }),
    {
      name: "naver-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
