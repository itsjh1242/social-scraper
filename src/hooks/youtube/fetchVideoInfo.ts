import apiKey from "./key";

const fetchVideoInfo = async (videoId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("❌ YouTube API 요청 실패");
  }

  const data = await res.json();
  return data;
};

export default fetchVideoInfo;
