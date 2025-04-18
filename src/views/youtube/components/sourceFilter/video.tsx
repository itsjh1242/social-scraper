import { Loading } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportCommentsToExcel } from "@/hooks/export/exportCommentsToExcel";
import { fetchVideoComments } from "@/hooks/youtube/fetchVideoComments";
import { useYoutubeStore } from "@/stores/youtubeStore";
import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { VideoInfo } from "../sourceLink/video";
import { Tip } from "../tip";

export const SourceFilterVideo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState<number>(100);
  const { video, videoComments, setVideoComments, progress, updateProgress } =
    useYoutubeStore();

  const handleGetComments = async () => {
    if (!video || !video.videoId) {
      console.error("비디오 ID가 없습니다.");
      return;
    }

    if (limit <= 0) {
      console.error("댓글 수를 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetchVideoComments(
        video.videoId,
        limit,
        updateProgress,
      );
      if (response) {
        setVideoComments(response);
      } else {
        console.error("비디오 댓글 목록을 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!video) return <Loading />;
  if (loading) return <Loading progress={progress} />;

  return (
    <>
      {/* Feature Card: Video Info */}
      {video && <VideoInfo video={video} />}
      {/* Download Tip */}
      <Tip>
        <p>
          이 영상에는 총{" "}
          <strong>{Number(video.commentCount).toLocaleString()}</strong>개의
          댓글이 등록되어 있습니다.
          <br />한 번에 가져올 수 있는 최대 댓글 수는 <strong>5,000개</strong>
          이며, 수집량이 많을수록 처리 시간이 조금 더 길어질 수 있어요.
          <br />
          원하는 댓글 수를 선택한 뒤, 아래 버튼을 눌러 Excel 파일로
          다운로드해보세요.
        </p>
      </Tip>

      {!videoComments && (
        <div className="flex w-full items-center gap-2">
          <SelectCount limit={limit} setLimit={setLimit} />
          <Button
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            onClick={handleGetComments}
          >
            가져오기
          </Button>
        </div>
      )}
      {videoComments && (
        <>
          <Button
            className="cursor-pointer bg-blue-500 hover:bg-blue-600"
            onClick={() => exportCommentsToExcel(video, videoComments)}
          >
            <FaFileExcel />
            Excel 다운로드
          </Button>
          <div className="min-h-0 space-y-2 overflow-y-auto py-5">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                총 <strong>{videoComments.length.toLocaleString()}</strong>개의
                댓글 데이터를 가져왔습니다.
                <br />
                아래는 대표 댓글 일부입니다.
              </p>

              <ul className="space-y-1 text-sm">
                {videoComments.slice(0, 3).map((comment) => (
                  <li
                    key={comment.id}
                    className="rounded border p-2 text-zinc-800 dark:text-zinc-200"
                  >
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(comment.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1">{comment.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

interface SelectCountProps {
  limit: number;
  setLimit: (limit: number) => void;
}
const SelectCount: React.FC<SelectCountProps> = ({ limit, setLimit }) => {
  return (
    <Select
      value={limit.toString()}
      onValueChange={(value) => setLimit(Number(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder="댓글 수" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="100">100개</SelectItem>
        <SelectItem value="200">200개</SelectItem>
        <SelectItem value="500">500개</SelectItem>
        <SelectItem value="1000">1,000개</SelectItem>
        <SelectItem value="2000">2,000개</SelectItem>
        <SelectItem value="3000">3,000개</SelectItem>
        <SelectItem value="4000">4,000개</SelectItem>
        <SelectItem value="5000">5,000개</SelectItem>
      </SelectContent>
    </Select>
  );
};
