import { Button } from "@/components/ui/button";
import { useYoutubeStore, YoutubeProcess } from "@/stores/youtubeStore";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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
    <div className="flex w-full gap-2">
      {prevStep && (
        <Button className="w-full flex-1" onClick={() => setProcess(prevStep)}>
          <ChevronLeftIcon />
          이전
        </Button>
      )}
      {nextStep && (
        <Button className="w-full flex-1" onClick={() => setProcess(nextStep)}>
          다음
          <ChevronRightIcon />
        </Button>
      )}
    </div>
  );
};
