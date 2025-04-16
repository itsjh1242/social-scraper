import { create } from "zustand";

export type YoutubeProcess = "sourceType" | "sourceLink";

interface YoutubeStore {
  /**
   * @description 유튜브 데이터 수집 프로세스 단계
   */
  process: YoutubeProcess;
  setProcess: (process: YoutubeProcess) => void;

  /**
   * @description 유튜브 데이터 수집 시 [채널 / 동영상] 중 하나 선택
   */
  sourceType: string;
  setSourceType: (type: string) => void;
}

export const useYoutubeStore = create<YoutubeStore>((set) => ({
  process: "sourceType",
  setProcess: (process: YoutubeProcess) => set({ process }),

  sourceType: "channel",
  setSourceType: (type: string) => set({ sourceType: type }),
}));
