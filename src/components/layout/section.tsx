import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
export const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        `mx-auto w-full max-w-[1400px] space-y-12 px-6 py-20`,
        className,
      )}
    >
      {children}
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}
export const SectionHeader: React.FC<FeatureCardProps> = ({
  title,
  description,
}) => {
  const handleBack = () => {
    window.location.href = `${import.meta.env.VITE_BROWSER_ROUTER_BASE_NAME}/`;
  };

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex cursor-pointer items-center" onClick={handleBack}>
        <ChevronLeftIcon size={16} />
        <Button variant="link">메인으로 돌아가기</Button>
      </div>
      <h1 className="text-4xl leading-tight font-bold">{title}</h1>
      <p className="text-muted-foreground text-lg break-keep">{description}</p>
    </div>
  );
};
