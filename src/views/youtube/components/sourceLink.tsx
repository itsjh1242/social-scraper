import { ProcessButton } from "./process-button";

export const SourceLink: React.FC = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <ProcessButton nextStep="sourceLink" prevStep="sourceType" />
    </div>
  );
};
