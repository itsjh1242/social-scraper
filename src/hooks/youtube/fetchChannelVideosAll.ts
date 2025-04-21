import { YouTubeVideoSchema } from "@/schemas/youtubeVideoSchema";
import apiKey from "./key";

/**
 * @description 진행도 프로세스 단계
 * 1단계: 비디오 플레이리스트 수집 0 ~ 70%
 * 2단계: 비디오 상세 정보 조회 70 ~ 100%
 */

const fetchChannelVideosAll = async (
  channelId: string,
  onProgress?: (percent: number) => void,
  untilYear = 1,
): Promise<YouTubeVideoSchema[]> => {
  const cutoffDate = new Date();
  cutoffDate.setFullYear(cutoffDate.getFullYear() - untilYear);

  // 1단계: 업로드 재생목록 ID 조회
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
  );
  const channelData = await channelRes.json();
  const uploadsId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsId) throw new Error("업로드 재생목록 ID를 찾을 수 없습니다.");

  const videoIdList: string[] = [];
  const videoMeta = new Map<
    string,
    {
      title: string;
      description: string;
      thumbnail: string;
      publishedAt: string;
    }
  >();
  let nextPageToken: string | undefined = undefined;
  let totalVideos = 0;

  // 2단계: playlistItems로 videoId 수집
  do {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsId}&maxResults=50&pageToken=${nextPageToken || ""}&key=${apiKey}`,
    );

    const playlistData: {
      items?: {
        contentDetails: { videoId: string };
        snippet: {
          title: string;
          description: string;
          thumbnails: { high: { url: string } };
          publishedAt: string;
        };
      }[];
      nextPageToken?: string;
      pageInfo?: {
        totalResults: number;
        resultsPerPage: number;
      };
    } = await playlistRes.json();

    if (totalVideos === 0 && playlistData.pageInfo?.totalResults) {
      totalVideos = playlistData.pageInfo.totalResults;
    }

    let stopFetching = false;

    playlistData.items?.forEach((item) => {
      const videoId = item.contentDetails.videoId;
      const publishedAt = new Date(item.snippet.publishedAt);

      if (publishedAt < cutoffDate) {
        stopFetching = true;
        return;
      }

      videoIdList.push(videoId);
      videoMeta.set(videoId, {
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      });

      if (onProgress && totalVideos > 0) {
        const percent = Math.min((videoIdList.length / totalVideos) * 70, 70);
        onProgress(Math.floor(percent));
      }
    });

    if (stopFetching) {
      break;
    }

    nextPageToken = playlistData.nextPageToken;
  } while (nextPageToken);

  // 3. videos API로 상세 정보 조회
  const chunk = <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );

  const results: YouTubeVideoSchema[] = [];
  const chunks = chunk(videoIdList, 50);

  for (const [index, group] of chunks.entries()) {
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${group.join(",")}&key=${apiKey}`,
    );

    const statsData: {
      items?: {
        id: string;
        snippet: {
          tags?: string[];
          categoryId: string;
          channelTitle: string;
        };
        contentDetails: {
          duration: string;
        };
        statistics: {
          viewCount?: string;
          likeCount?: string;
          commentCount?: string;
        };
      }[];
    } = await statsRes.json();

    statsData.items?.forEach((item) => {
      const meta = videoMeta.get(item.id);
      if (!meta) return;

      results.push({
        videoId: item.id,
        title: meta.title,
        description: meta.description,
        thumbnail: meta.thumbnail,
        publishedAt: meta.publishedAt,
        duration: item.contentDetails.duration,
        tags: item.snippet.tags ?? [],
        categoryId: item.snippet.categoryId,
        channelTitle: item.snippet.channelTitle,
        viewCount: parseInt(item.statistics.viewCount ?? "0"),
        likeCount: parseInt(item.statistics.likeCount ?? "0"),
        commentCount: parseInt(item.statistics.commentCount ?? "0"),
      });
    });

    if (onProgress) {
      const percent = 70 + ((index + 1) / chunks.length) * 30; // 70~100 사이 비율 계산
      onProgress(Math.min(Math.floor(percent), 100));
    }
  }

  return results;
};

export default fetchChannelVideosAll;
