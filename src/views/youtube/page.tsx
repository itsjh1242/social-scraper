import { Section, SectionHeader } from "@/components/layout/section";
import { Setup } from "./set-up";

export const YoutubePage: React.FC = () => {
  return (
    <Section className="flex h-screen flex-col">
      <SectionHeader
        title="유튜브 데이터 수집 및 분석"
        description="유튜브 채널, 동영상, 댓글 등 다양한 데이터를 수집하고 분석하여
          인사이트를 제공합니다."
      />
      <div
        className="flex h-full flex-1"
        style={{ maxHeight: "calc(100% - 160px)" }}
      >
        <div className="flex h-full w-[70%] pr-4">
          <Setup />
        </div>
        <div className="w-[30%] border-l pl-4" />
      </div>
    </Section>
  );
};
