import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseKoreanDate } from "@/hooks/func/formatDate";
import { getYoutubeCategoryName } from "@/hooks/func/getYoutubeCategoryName";
import { formatDuration } from "@/hooks/func/parseISODuration";
import fetchVideoInfo from "@/hooks/youtube/fetchVideoInfo";
import { resolveVideoIdFromInput } from "@/hooks/youtube/resolver";
import { YouTubeVideoSchema } from "@/schemas/youtubeVideoSchema";
import { useYoutubeStore } from "@/stores/youtubeStore";
import { useState } from "react";
import { Tip } from "../tip";

export const SourceLinkVideo: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { video, setVideo, videoId, setVideoId, setSourceLinkComplete } =
    useYoutubeStore();

  /**
   * @description 동영상 ID를 입력받아 유튜브 API를 통해 동영상 정보를 조회합니다.
   */
  const handleSubmit = async () => {
    if (!videoId) {
      setErrorMessage("동영상 ID를 입력해주세요.");
      return;
    }

    try {
      const videoIdResponse = await resolveVideoIdFromInput(videoId.trim());
      if (!videoIdResponse) {
        setErrorMessage("유효하지 않은 동영상 ID입니다.");
        return;
      }
      setVideoId(videoIdResponse);

      const data = await fetchVideoInfo(videoIdResponse);
      const item = data.items?.[0];

      if (!item) {
        setErrorMessage("동영상 정보를 찾을 수 없습니다.");
        return;
      }

      const parsedVideoData: YouTubeVideoSchema = {
        videoId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url,
        duration: item.contentDetails?.duration ?? "",
        tags: item.snippet.tags,
        categoryId: item.snippet.categoryId,
        channelTitle: item.snippet.channelTitle,
        viewCount: Number(item.statistics.viewCount),
        likeCount: Number(item.statistics.likeCount),
        commentCount: Number(item.statistics.commentCount),
      };

      setVideo(parsedVideoData);
      setSourceLinkComplete(true);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("동영상 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  /**
   * @descroption Input 초기화
   */
  const handleInputReset = () => {
    setVideoId("");
    setVideo(null);
    setSourceLinkComplete(false);
    setErrorMessage("");
  };

  return (
    <>
      <Tip>
        <p>
          분석할 유튜브 동영상의 URL을 입력해주세요.
          <br />
          예: <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>
          <br />
          입력하신 링크를 기반으로 해당 영상의 정보와 댓글 데이터를 수집합니다.
        </p>
      </Tip>
      {/* Input: Video URL */}
      <div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="dQw4w9WgXcQ"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
          {!video && <Button onClick={handleSubmit}>조회</Button>}
          {video && (
            <Button variant="destructive" onClick={handleInputReset}>
              초기화
            </Button>
          )}
        </div>
        {/* Error Message */}
        <p className="text-sm text-red-500">{errorMessage}</p>
        {video && (
          <p className="text-sm text-green-500">
            동영상 정보를 확인한 후 다음 단계로 넘어가세요
          </p>
        )}
      </div>
      {/* Feature Card: Video Info */}
      {video && <VideoInfo video={video} />}
    </>
  );
};

interface VideoInfoProps {
  video: YouTubeVideoSchema;
}
export const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <div className="space-y-4 py-4 text-sm text-zinc-800 dark:text-zinc-200">
      <div className="flex items-start gap-4">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-40 rounded shadow"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-medium">{video.title}</h2>
          <p className="text-muted-foreground text-xs">{video.channelTitle}</p>
          <p className="text-muted-foreground text-xs">
            {video.viewCount.toLocaleString()}회 •{" "}
            {parseKoreanDate(video.publishedAt).fullText} •{" "}
            {formatDuration(video.duration)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <strong>영상 ID:</strong> {video.videoId}
        </div>
        <div>
          <strong>카테고리:</strong> {getYoutubeCategoryName(video.categoryId)}
        </div>
        <div>
          <strong>좋아요:</strong> {video.likeCount.toLocaleString()}
        </div>
        <div>
          <strong>댓글:</strong> {video.commentCount.toLocaleString()}
        </div>
      </div>

      {video.description && (
        <div className="text-muted-foreground line-clamp-4 text-xs whitespace-pre-line">
          {video.description}
        </div>
      )}
    </div>
  );
};
