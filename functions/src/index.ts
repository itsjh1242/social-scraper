import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });

/**
 * @description: YouTube API를 사용하여 채널 정보를 가져오는 함수
 */
export const fetchChannelInfo = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { channelId } = req.query;

    // 유효성 검사
    if (!channelId || typeof channelId !== "string") {
      res.status(400).json({ error: "채널 ID가 필요합니다." });
      return;
    }

    const apiKey = "";
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        res.status(404).json({ error: "채널을 찾을 수 없습니다." });
        return;
      }

      const item = data.items[0];

      const channelInfo = {
        channelId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.high?.url,
        publishedAt: item.snippet.publishedAt,
        subscriberCount: item.statistics.subscriberCount,
        videoCount: item.statistics.videoCount,
        viewCount: item.statistics.viewCount,
      };

      res.status(200).json(channelInfo);
    } catch (error) {
      console.error("Error fetching channel info:", error);
      res
        .status(500)
        .json({ error: "채널 정보를 가져오는 중 오류가 발생했습니다." });
    }
  });
});
