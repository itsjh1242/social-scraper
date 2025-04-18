import apiKey from "./key";

const fetchChannelInfo = async (channelId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("❌ YouTube API 요청 실패");
  }

  const data = await res.json();
  return data;
};

export default fetchChannelInfo;
