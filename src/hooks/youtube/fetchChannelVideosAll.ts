import { YouTubeVideoSchema } from "@/schemas/youtubeVideoSchema";
import apiKey from "./key";

const fetchChannelVideosAll = async (
  channelId: string,
): Promise<YouTubeVideoSchema[]> => {
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
    } = await playlistRes.json();

    playlistData.items?.forEach((item) => {
      const videoId = item.contentDetails.videoId;
      videoIdList.push(videoId);
      videoMeta.set(videoId, {
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
      });
    });

    nextPageToken = playlistData.nextPageToken;
  } while (nextPageToken);

  // 3. videos API로 상세 정보 조회
  const chunk = <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );

  const results: YouTubeVideoSchema[] = [];

  for (const group of chunk(videoIdList, 50)) {
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
  }

  return results;
};

export default fetchChannelVideosAll;
