import { Input } from "@/components/ui/input";
import { useNaverStore } from "@/stores/naverStore";
import { Tip } from "../youtube/components/tip";

export const Control: React.FC = () => {
  const { blogPostUrl, setBlogPostUrl } = useNaverStore();

  return (
    <div className="flex w-full flex-col gap-2">
      <Tip>
        <p>
          네이버 블로그 게시물 링크를 입력하세요. 제목, 본문, 댓글, 공감 수를
          자동으로 분석합니다.
        </p>
        <p>※ 이웃공개/비공개 글은 지원되지 않습니다.</p>
        <p className="mt-2">예: https://blog.naver.com/umsal/223841113352</p>
      </Tip>

      {/* Get Blog URL */}
      <Input
        placeholder="예: https://blog.naver.com/umsal/223841113352"
        value={blogPostUrl}
        onChange={(e) => setBlogPostUrl(e.target.value)}
      />
    </div>
  );
};
