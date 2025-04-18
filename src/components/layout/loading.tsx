import { Loader2 } from "lucide-react"; // 아이콘 라이브러리 사용 (lucide-react 추천)

export const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">데이터를 불러오는 중입니다...</p>
      </div>
    </div>
  );
};
