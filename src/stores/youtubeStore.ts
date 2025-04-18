import { YoutubeChannelSchema } from "@/schemas/youtubeChannelSchema";
import { YouTubeVideoSchema } from "@/schemas/youtubeVideoSchema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type YoutubeProcess = "sourceType" | "sourceLink" | "sourceFilter";

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

  /**
   * @description 유튜브 채널 ID
   */
  channelId: string;
  setChannelId: (channelId: string) => void;

  /**
   * @description 채널 데이터
   */
  channel: YoutubeChannelSchema | null;
  setChannel: (channel: YoutubeChannelSchema | null) => void;

  /**
   * @description 채널 동영상 목록
   */
  channelVideos: YouTubeVideoSchema[] | null;
  setChannelVideos: (videos: YouTubeVideoSchema[] | null) => void;

  /**
   * @description 상태 초기화
   */
  reset: () => void;
}

export const useYoutubeStore = create<YoutubeStore>()(
  persist(
    (set) => ({
      process: "sourceType",
      setProcess: (process: YoutubeProcess) => set({ process }),

      sourceType: "channel",
      setSourceType: (type: string) => set({ sourceType: type }),

      channelId: "",
      setChannelId: (channelId: string) => set({ channelId }),

      channel: null,
      setChannel: (channel: YoutubeChannelSchema | null) => set({ channel }),

      channelVideos: null,
      setChannelVideos: (videos: YouTubeVideoSchema[] | null) =>
        set({ channelVideos: videos }),

      reset: () =>
        set({
          process: "sourceType",
          sourceType: "channel",
          channelId: "",
          channel: null,
          channelVideos: null,
        }),
    }),
    {
      name: "youtube-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
