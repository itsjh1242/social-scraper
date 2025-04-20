import { Loader2 } from "lucide-react";

interface LoadingProps {
  progress?: number; // 0~100 사이 숫자
  text?: string; // 로딩 중일 때 보여줄 텍스트
}

export const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">
          {typeof progress === "number"
            ? `댓글 데이터를 수집 중입니다... (${progress}%)`
            : "데이터를 불러오는 중입니다..."}
        </p>
      </div>
    </div>
  );
};
