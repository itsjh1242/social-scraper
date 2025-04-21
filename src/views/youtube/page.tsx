import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/layout/section";
import { useYoutubeStore } from "@/stores/youtubeStore";
import { SourceFilter } from "./components/sourceFilter/page";
import { SourceLink } from "./components/sourceLink/page";
import { SourceType } from "./components/sourceType/page";

export const YoutubePage: React.FC = () => {
  const { process } = useYoutubeStore();
  return (
    <Section className="flex h-screen w-full flex-col">
      <SectionHeader
        title="유튜브 데이터 수집 및 분석"
        description="유튜브 채널, 동영상, 댓글 등 다양한 데이터를 수집하고 분석하여
          인사이트를 제공합니다."
      />
      <SectionContent>
        {process === "sourceType" && <SourceType />}
        {process === "sourceLink" && <SourceLink />}
        {process === "sourceFilter" && <SourceFilter />}
      </SectionContent>
    </Section>
  );
};
