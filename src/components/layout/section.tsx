import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";

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
    window.location.href = "/";
  };
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex items-center gap-4">
        <ChevronLeftIcon
          size={32}
          className="cursor-pointer transition hover:scale-110"
          onClick={handleBack}
        />
        <h1 className="text-4xl leading-tight font-bold">{title}</h1>
      </div>
      <p className="text-muted-foreground pl-13 text-lg break-keep">
        {description}
      </p>
    </div>
  );
};
