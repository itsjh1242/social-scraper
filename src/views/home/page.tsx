import { Section } from "@/components/layout/section";
import { StartDropdownMenu } from "./start-dropdown-menu";

import { BarChart, Briefcase, FileFolder } from "@/components/emoji/emoji";
import { activeSocials } from "./active-socials";

export const HomePage: React.FC = () => {
  return (
    <Section className="space-y-24">
      {/* Hero */}
      <div className="space-y-6 py-24 text-center">
        <h1 className="text-5xl leading-tight font-bold">
          소셜 미디어 데이터 수집의 시작
        </h1>
        <p className="text-muted-foreground mx-auto max-w-xl text-lg">
          콘텐츠를 실시간으로 수집하고 분석하세요.
          <br />
          클릭 한 번으로 데이터를 정리된 형태로 제공합니다.
        </p>
        <div className="pt-6">
          <StartDropdownMenu />
        </div>
      </div>

      {/* 지원 플랫폼 */}
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm">지원 중인 플랫폼</p>
        <div className="flex flex-wrap justify-center gap-3">
          {activeSocials.map((active) => {
            return (
              <PlatformBadge
                key={active.name}
                label={active.name}
                color={active.color}
                shortcut={active.shortcut}
                disabled={active.disabled}
              />
            );
          })}
        </div>
      </div>

      {/* 핵심 기능 */}
      <div className="grid gap-8 md:grid-cols-3">
        <Feature
          icon={<Briefcase size={40} />}
          title="멀티 플랫폼 수집"
          desc="여러 플랫폼의 콘텐츠를 API 기반으로 정확하고 빠르게 수집합니다."
        />
        <Feature
          icon={<BarChart size={40} />}
          title="데이터 정제 및 구조화"
          desc="중복 제거, 표준화, 핵심지표 요약으로 실용성 높은 데이터 제공"
        />
        <Feature
          icon={<FileFolder size={40} />}
          title="엑셀 및 리포트 출력"
          desc="분석 목적에 맞게 데이터를 자동 포맷팅하여 파일로 제공"
        />
      </div>

      <footer className="text-muted-foreground border-t pt-6 pb-12 text-center text-sm">
        © {new Date().getFullYear()} JunHyeon Kim ·{" "}
        <a
          href="https://github.com/itsjh1242"
          className="hover:text-foreground underline"
        >
          @itsjh1242
        </a>
      </footer>
    </Section>
  );
};

const PlatformBadge = ({
  label,
  color,
  shortcut,
  disabled = false,
}: {
  label: string;
  color: string;
  shortcut: string;
  disabled?: boolean;
}) => {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-sm font-medium ${
        disabled ? "bg-muted text-muted-foreground border-muted" : "text-white"
      }`}
      style={{ backgroundColor: disabled ? undefined : color }}
    >
      {label} {disabled && <span>({shortcut})</span>}
    </span>
  );
};

const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex flex-col items-center justify-center space-y-3 text-center">
    <div className="self-center">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-muted-foreground text-sm">{desc}</p>
  </div>
);
