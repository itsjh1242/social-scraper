import { useYoutubeStore } from "@/stores/youtubeStore";
import { SourceLink } from "./components/sourceLink";
import { SourceType } from "./components/sourceType";

/**
 * @description YouTube 데이터 수집 및 분석을 위한 설정 페이지
 */
export const Setup: React.FC = () => {
  const { process } = useYoutubeStore();
  return (
    <div className="h-full w-full">
      {process === "sourceType" && <SourceType />}
      {process === "sourceLink" && <SourceLink />}
    </div>
  );
};
