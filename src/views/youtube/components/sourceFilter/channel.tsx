import { Loading } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportVideosToExcel } from "@/hooks/export/exportYoutubeVideosToExcel";
import { parseKoreanDate } from "@/hooks/func/formatDate";
import { formatDuration } from "@/hooks/func/parseISODuration";
import fetchChannelVideosAll from "@/hooks/youtube/fetchChannelVideosAll";
import { YouTubeVideoSchema } from "@/schemas/youtubeVideoSchema";
import { useYoutubeStore } from "@/stores/youtubeStore";
import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { Tip } from "../tip";

export const SourceFilterChannel: React.FC = () => {
  const { channel, channelVideos } = useYoutubeStore();

  return (
    <>
      <Tip>
        {!channelVideos && channel && (
          <p>
            채널 <strong>{channel.title}</strong>의 동영상 데이터를 불러오려면
            아래 버튼을 눌러주세요.
          </p>
        )}

        {channelVideos && channel && (
          <p>
            채널 <strong>{channel.title}</strong>에서 총{" "}
            <strong>{channelVideos.length.toLocaleString()}</strong>개의 동영상
            데이터를 가져왔습니다.
          </p>
        )}
      </Tip>
      {channel && channelVideos && (
        <>
          <Button
            variant="link"
            className="w-fit cursor-pointer self-end"
            onClick={() => {
              exportVideosToExcel(channel, channelVideos);
            }}
          >
            <FaFileExcel />
            Excel 다운로드
          </Button>
          <VideoList videos={channelVideos} />
        </>
      )}
      {!channelVideos && <GetVideosComponent />}
    </>
  );
};

interface VideoListProps {
  videos: YouTubeVideoSchema[];
}
const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="h-full flex-1 overflow-y-auto py-2">
      <Accordion type="single" collapsible className="w-full">
        {videos.map((video) => {
          return (
            <AccordionItem key={video.videoId} value={video.videoId}>
              <AccordionTrigger>
                <div className="flex flex-col text-left">
                  <span className="font-medium">{video.title}</span>
                  <span className="text-muted-foreground text-sm">
                    {parseKoreanDate(video.publishedAt).dotted} ·{" "}
                    {video.viewCount} views · {formatDuration(video.duration)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-40 rounded"
                  />
                  <div className="flex flex-col gap-2 text-sm">
                    <p>
                      <strong>채널:</strong> {video.channelTitle}
                    </p>
                    <p>
                      <strong>카테고리 ID:</strong> {video.categoryId}
                    </p>
                    <p>
                      <strong>게시 날짜:</strong>{" "}
                      {parseKoreanDate(video.publishedAt).fullText}
                    </p>
                    <p>
                      <strong>조회수:</strong> {video.viewCount}회
                    </p>
                    <p>
                      <strong>좋아요:</strong> {video.likeCount} ·{" "}
                      <strong>댓글:</strong> {video.commentCount}
                    </p>
                    <p>
                      <strong>설명:</strong>{" "}
                      {video.description || "설명이 없습니다."}
                    </p>
                    {video.tags && video.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-muted rounded px-2 py-0.5 text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

const GetVideosComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [untilYears, setUntilYears] = useState<number | null>(null);
  const { channel, setChannelVideos, progress, setProgress } =
    useYoutubeStore();

  const oldestYear = channel?.publishedAt
    ? new Date(channel.publishedAt).getFullYear()
    : new Date().getFullYear();

  const currentYear = new Date().getFullYear();
  const yearRange = currentYear - oldestYear + 1; // 포함해서

  const handleGetVideos = async () => {
    if (!channel || !channel.id) {
      console.error("채널 ID가 없습니다.");
      return;
    }

    if (!untilYears) {
      alert("수집 범위를 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetchChannelVideosAll(channel?.id, setProgress);
      if (response) {
        setChannelVideos(response);
      } else {
        console.error("채널 동영상 목록을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!channel) return <Loading />;
  if (loading) return <Loading progress={progress} />;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="mb-4 text-center text-sm text-gray-600">
        <span className="font-semibold">{channel.title}</span> 채널은 총{" "}
        <span className="font-semibold">
          {channel.statistics.videoCount.toLocaleString()}개
        </span>
        의 동영상을 업로드했고,
        <br />
        구독자 수는{" "}
        <span className="font-semibold">
          {channel.statistics.subscriberCount.toLocaleString()}명
        </span>
        , 총 조회수는{" "}
        <span className="font-semibold">
          {channel.statistics.viewCount.toLocaleString()}회
        </span>
        입니다.
        <br />이 채널의 모든 영상 데이터를 불러올까요?
      </p>

      <div className="flex items-center gap-2">
        <Select
          value={untilYears?.toString()}
          onValueChange={(value) => setUntilYears(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="수집 범위 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>영상 수집 범위</SelectLabel>
              {Array.from({ length: yearRange }, (_, i) => {
                const value = i + 1;
                const isMax = value === yearRange;

                return (
                  <SelectItem key={value} value={value.toString()}>
                    {isMax ? "전체 기간" : `최근 ${value}년 간`}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleGetVideos}>데이터 가져오기</Button>
      </div>
    </div>
  );
};
