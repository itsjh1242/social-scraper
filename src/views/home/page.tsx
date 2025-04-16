import { BarChart, Briefcase } from "@/components/emoji/emoji";
import { Section } from "@/components/layout/section";
import { StartDropdownMenu } from "./start-dropdown-menu";

export const HomePage: React.FC = () => {
  return (
    <Section>
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-4xl leading-tight font-bold">
          소셜 미디어 데이터, <br />한 곳에서 수집하고 분석하세요
        </h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-lg break-keep">
          유튜브, 트위터, 인스타그램 등 다양한 플랫폼에서 공개된 콘텐츠를
          실시간으로 수집하고, 정제된 데이터로 전환해드립니다.
        </p>
        <div className="flex justify-center gap-4">
          <StartDropdownMenu />
        </div>
      </div>

      {/* 현재 지원되는 소셜 미디어 */}
      <div className="flex flex-col items-center space-y-2">
        <p className="text-muted-foreground text-sm">현재 지원되는 플랫폼</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-[#FF0000]/30 bg-[#FF0000]/10 px-3 py-1 text-sm font-medium text-[#FF0000]">
            YouTube
          </span>
          <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm font-medium">
            Twitter (준비 중)
          </span>
          <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm font-medium">
            Instagram (준비 중)
          </span>
        </div>
      </div>

      {/* 기능 소개 */}
      <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
        <FeatureCard
          title="멀티 플랫폼 수집"
          description="주요 소셜 미디어 플랫폼에서 공개된 콘텐츠 및 메타데이터를 기반으로 데이터를 수집합니다. 특정 키워드, 채널, 해시태그 등을 기준으로 정확하고 타겟된 정보를 확보할 수 있으며, API 기반 접근을 통해 데이터의 무결성과 안정성을 유지합니다."
        >
          <Briefcase size={60} />
        </FeatureCard>
        <FeatureCard
          title="가공된 데이터 출력"
          description="수집된 데이터는 목적에 맞게 필터링 및 정제 과정을 거쳐, 사용자가 쉽게 분석할 수 있도록 구조화된 엑셀 파일 형태로 출력됩니다. 중복 제거, 형식 표준화, 주요 지표 요약 등의 전처리를 통해 보고서 작성이나 리서치에 바로 활용할 수 있습니다."
        >
          <BarChart size={60} />
        </FeatureCard>
      </div>

      <footer className="text-muted-foreground w-full border-t pt-6 pb-12 text-center text-sm">
        © {new Date().getFullYear()} JunHyeon Kim ·{" "}
        <a
          href="https://github.com/itsjh1242"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground underline"
        >
          @itsjh1242
        </a>
      </footer>
    </Section>
  );
};

// 컴포넌트
const FeatureCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border bg-white p-4 shadow-sm">
    {children}
    <h3 className="mt-6 mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);
