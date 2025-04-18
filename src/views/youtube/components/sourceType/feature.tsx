import { useYoutubeStore } from "@/stores/youtubeStore";
import { Tip } from "../tip";

export const SourceTypeFeature: React.FC = () => {
  return (
    <>
      <Tip>
        <p>어떤 유형의 데이터를 수집할지 선택하세요.</p>
      </Tip>
      <SourceTypeFeatureCard
        identifier="channel"
        title="채널 (Channel)"
        description="지정한 유튜브 채널의 전체 동영상 목록을 수집한 뒤, 각 동영상의 조회수, 좋아요 수, 댓글 수 등의 주요 지표를 선택적으로 추출하여 구조화된 엑셀 파일로 다운로드할 수 있습니다. 한 번의 입력으로 전체 콘텐츠에 대한 분석 데이터를 빠르게 확보할 수 있습니다."
      />
      <SourceTypeFeatureCard
        identifier="video"
        title="동영상 (Video)"
        description="특정 유튜브 동영상의 조회수, 좋아요 수, 댓글 수 등 대표적인 상호작용 지표를 단일 건 단위로 수집합니다. 영상별 세부 성과를 빠르게 확인하거나, 개별 콘텐츠의 퍼포먼스를 정밀 분석할 때 유용합니다."
      />
    </>
  );
};

interface SourceTypeFeatureCardProps {
  identifier: string;
  title: string;
  description: string;
}
const SourceTypeFeatureCard: React.FC<SourceTypeFeatureCardProps> = ({
  identifier,
  title,
  description,
}) => {
  const { sourceType, setSourceType } = useYoutubeStore();
  return (
    <div
      className={`bg-card flex cursor-pointer flex-col rounded-lg border p-4 shadow-sm ${sourceType === identifier ? "border-accent-foreground" : "border-muted"}`}
      onClick={() => setSourceType(identifier)}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm break-keep">{description}</p>
    </div>
  );
};
