import apiKey from "./key";

export const searchChannelIdByKeyword = async (
  keyword: string,
): Promise<string | null> => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
    keyword,
  )}&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("❌ YouTube 채널 검색 API 요청 실패");
  }

  const data = await res.json();
  return data.items?.[0]?.id?.channelId ?? null;
};
