import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/layout/section";
import { Control } from "./control";

export const NaverPage: React.FC = () => {
  return (
    <Section className="flex h-screen flex-col">
      <SectionHeader
        title="네이버 블로그 데이터 자동 수집 도구"
        description="블로그 URL 입력만으로 주요 콘텐츠를 자동으로 추출하고 분석할 수 있습니다."
      />
      <SectionContent>
        {/* control */}
        <div className="h-full w-full max-w-[70%] pr-2">
          <Control />
        </div>
        {/* iframe */}
        <div className="h-full w-full max-w-[30%] border-l pl-2"></div>
      </SectionContent>
    </Section>
  );
};
