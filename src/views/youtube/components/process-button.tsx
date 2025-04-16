import { Button } from "@/components/ui/button";
import { useYoutubeStore, YoutubeProcess } from "@/stores/youtubeStore";

interface ProcessButtonProps {
  nextStep?: YoutubeProcess;
  prevStep?: YoutubeProcess;
}
export const ProcessButton: React.FC<ProcessButtonProps> = ({
  nextStep,
  prevStep,
}) => {
  const { setProcess } = useYoutubeStore();
  return (
    <div className="flex w-full gap-4">
      {nextStep && (
        <Button className="w-full" onClick={() => setProcess(nextStep)}>
          다음
        </Button>
      )}
      {prevStep && (
        <Button className="w-full" onClick={() => setProcess(prevStep)}>
          이전
        </Button>
      )}
    </div>
  );
};
