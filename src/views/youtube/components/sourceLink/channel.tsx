import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import fetchChannelInfo from "@/hooks/youtube/fetchChannelInfo";
import { resolveChannelIdFromInput } from "@/hooks/youtube/resolver";
import { YoutubeChannelSchema } from "@/schemas/youtubeChannelSchema";
import { useYoutubeStore } from "@/stores/youtubeStore";
import { useState } from "react";
import { Tip } from "../tip";

export const SourceLinkChannel: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    channelId,
    setChannelId,
    channel,
    setChannel,
    setSourceLinkComplete,
  } = useYoutubeStore();

  /**
   * @description 채널 ID를 입력받아 유튜브 API를 통해 채널 정보를 조회합니다.
   */
  const handleSubmit = async () => {
    if (!channelId) {
      setErrorMessage("채널 ID를 입력해주세요.");
      return;
    }

    try {
      const channelIdResponse = await resolveChannelIdFromInput(
        channelId.trim(),
      );
      if (!channelIdResponse) {
        setErrorMessage("유효하지 않은 채널 ID입니다.");
        return;
      }
      setChannelId(channelIdResponse);

      const data = await fetchChannelInfo(channelIdResponse);
      const item = data.items?.[0];

      if (!item) {
        setErrorMessage("채널 정보를 찾을 수 없습니다.");
        return;
      }

      const parsedChannelData: YoutubeChannelSchema = {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        customUrl: item.snippet.customUrl,
        country: item.snippet.country,
        thumbnails: {
          default: item.snippet.thumbnails.default.url,
          medium: item.snippet.thumbnails.medium.url,
          high: item.snippet.thumbnails.high.url,
        },
        statistics: {
          subscriberCount: Number(item.statistics.subscriberCount),
          viewCount: Number(item.statistics.viewCount),
          videoCount: Number(item.statistics.videoCount),
        },
      };

      setChannel(parsedChannelData);
      setSourceLinkComplete(true);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("채널 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  /**
   * @description Input 초기화
   */
  const handleReset = () => {
    setChannelId("");
    setChannel(null);
    setSourceLinkComplete(false);
    setErrorMessage("");
  };

  return (
    <>
      <Tip>
        <p>
          유튜브 채널 주소를 입력해주세요.
          <br />
          예: <code>https://www.youtube.com/@IBS</code>
          <br />
          <span className="text-sm text-gray-500">
            <code>/@핸들</code>, <code>/c/커스텀URL</code>,{" "}
            <code>/channel/ID</code> 형식 모두 지원됩니다. 입력하신 주소에서
            채널 ID를 자동으로 추출합니다.
          </span>
        </p>
      </Tip>
      {/* Input: Channel Id */}
      <div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="UCxxxxxxxxxxxxxxxx"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
          />
          {!channel && <Button onClick={handleSubmit}>조회</Button>}
          {channel && (
            <Button variant="destructive" onClick={handleReset}>
              초기화
            </Button>
          )}
        </div>
        {/* Error Message */}
        <p className="text-sm text-red-500">{errorMessage}</p>
        {channel && (
          <p className="text-sm text-green-500">
            채널 정보를 확인한 후 다음 단계로 넘어가세요
          </p>
        )}
      </div>
      {/* Feature Card: Channel Info */}
      {channel && <ChannelInfo channel={channel} />}
    </>
  );
};

interface ChannelInfoProps {
  channel: YoutubeChannelSchema;
}
const ChannelInfo: React.FC<ChannelInfoProps> = ({ channel }) => {
  return (
    <div className="space-y-4 py-4 text-sm text-zinc-800 dark:text-zinc-200">
      {/* 썸네일 + 타이틀 */}
      <div className="flex items-center gap-3">
        <img
          src={channel.thumbnails.default}
          alt="채널 썸네일"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium">{channel.title}</span>
          {channel.customUrl && (
            <a
              href={`https://www.youtube.com/${channel.customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500"
            >
              {channel.customUrl}
            </a>
          )}
        </div>
      </div>

      {/* 설명 */}
      <p className="line-clamp-3 text-zinc-600 dark:text-zinc-400">
        {channel.description}
      </p>

      {/* 통계 */}
      <div className="flex gap-4 text-xs text-zinc-500">
        <div>
          구독자 {channel.statistics.subscriberCount.toLocaleString()}명
        </div>
        <div>조회수 {channel.statistics.viewCount.toLocaleString()}</div>
        <div>영상 {channel.statistics.videoCount.toLocaleString()}개</div>
      </div>

      {/* 개설일 */}
      <div className="text-xs text-zinc-400">
        개설일 {new Date(channel.publishedAt).toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
};
