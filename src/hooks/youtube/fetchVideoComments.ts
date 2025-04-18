import { YouTubeCommentSchema } from "@/schemas/youtubeVideoSchema";
import apiKey from "./key";

export const fetchVideoComments = async (
  videoId: string,
  limit: number,
  onProgress?: (count: number, percent: number) => void,
): Promise<YouTubeCommentSchema[]> => {
  const comments: YouTubeCommentSchema[] = [];
  let nextPageToken: string | undefined = undefined;

  while (comments.length < limit) {
    const url = new URL("https://www.googleapis.com/youtube/v3/commentThreads");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("videoId", videoId);
    url.searchParams.set("maxResults", "100");
    url.searchParams.set("textFormat", "plainText");
    url.searchParams.set("key", apiKey);
    if (nextPageToken) url.searchParams.set("pageToken", nextPageToken);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("❌ 댓글 데이터를 불러오지 못했습니다.");

    const data = await res.json();

    for (const item of data.items || []) {
      const top = item.snippet.topLevelComment.snippet;
      comments.push({
        id: item.id,
        videoId,
        text: top.textDisplay,
        author: top.authorDisplayName,
        likeCount: top.likeCount,
        publishedAt: top.publishedAt,
        isReply: false, // 대댓글은 수집 안함
      });

      if (comments.length >= limit) break;
    }

    if (onProgress) {
      const percent = Math.min((comments.length / limit) * 100, 100);
      onProgress(comments.length, Math.floor(percent));
    }

    if (!data.nextPageToken) break;
    nextPageToken = data.nextPageToken;
  }

  return comments;
};
