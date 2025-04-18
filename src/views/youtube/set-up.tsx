import { useYoutubeStore } from "@/stores/youtubeStore";

import { SourceFilter } from "./components/sourceFilter/page";
import { SourceLink } from "./components/sourceLink/page";
import { SourceType } from "./components/sourceType/page";

/**
 * @description YouTube 데이터 수집 및 분석을 위한 설정 페이지
 */
export const Setup: React.FC = () => {
  const { process } = useYoutubeStore();
  return (
    <div className="h-full w-full">
      {process === "sourceType" && <SourceType />}
      {process === "sourceLink" && <SourceLink />}
      {process === "sourceFilter" && <SourceFilter />}
    </div>
  );
};
