import { YoutubeChannelSchema } from "@/schemas/youtubeChannelSchema";
import {
  YouTubeCommentSchema,
  YouTubeVideoSchema,
} from "@/schemas/youtubeVideoSchema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type YoutubeProcess = "sourceType" | "sourceLink" | "sourceFilter";

interface YoutubeStore {
  /**
   * @description 데이터 수집 진행률
   */
  progress: number;
  setProgress: (progress: number) => void;
  currentCount: number;
  setCurrentCount: (count: number) => void;
  targetCount: number;
  setTargetCount: (count: number) => void;
  updateProgress: (count: number, percvent: number) => void;

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
   * @description 비디오 ID
   */
  videoId: string;
  setVideoId: (videoId: string) => void;

  /**
   * @description 채널 데이터
   */
  channel: YoutubeChannelSchema | null;
  setChannel: (channel: YoutubeChannelSchema | null) => void;

  /**
   * @description 동영상 데이터
   */
  video: YouTubeVideoSchema | null;
  setVideo: (video: YouTubeVideoSchema | null) => void;

  /**
   * @description 채널 동영상 목록
   */
  channelVideos: YouTubeVideoSchema[] | null;
  setChannelVideos: (videos: YouTubeVideoSchema[] | null) => void;

  /**
   * @description 동영상 댓글 데이터
   */
  videoComments: YouTubeCommentSchema[] | null;
  setVideoComments: (comments: YouTubeCommentSchema[] | null) => void;

  /**
   * @description 상태 초기화
   */
  reset: () => void;
}

export const useYoutubeStore = create<YoutubeStore>()(
  persist(
    (set) => ({
      progress: 0,
      setProgress: (progress: number) => set({ progress }),
      currentCount: 0,
      setCurrentCount: (count: number) => set({ currentCount: count }),
      targetCount: 0,
      setTargetCount: (count: number) => set({ targetCount: count }),
      updateProgress: (count: number, percent: number) =>
        set({ currentCount: count, progress: percent }),

      process: "sourceType",
      setProcess: (process: YoutubeProcess) => set({ process }),

      sourceType: "channel",
      setSourceType: (type: string) => set({ sourceType: type }),

      channelId: "",
      setChannelId: (channelId: string) => set({ channelId }),

      videoId: "",
      setVideoId: (videoId: string) => set({ videoId }),

      channel: null,
      setChannel: (channel: YoutubeChannelSchema | null) => set({ channel }),

      video: null,
      setVideo: (video: YouTubeVideoSchema | null) => set({ video }),

      channelVideos: null,
      setChannelVideos: (videos: YouTubeVideoSchema[] | null) =>
        set({ channelVideos: videos }),

      videoComments: null,
      setVideoComments: (comments: YouTubeCommentSchema[] | null) =>
        set({ videoComments: comments }),

      reset: () =>
        set({
          process: "sourceType",
          sourceType: "channel",
          channelId: "",
          channel: null,
          channelVideos: null,
          videoId: "",
          video: null,
          videoComments: null,
          progress: 0,
          currentCount: 0,
          targetCount: 0,
        }),
    }),
    {
      name: "youtube-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
