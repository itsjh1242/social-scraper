import { useYoutubeStore } from "@/stores/youtubeStore";
import { Expand, Layout } from "../layout";
import { ProcessButton } from "../process-button";
import { SourceLinkChannel } from "./channel";

export const SourceLink: React.FC = () => {
  const { sourceType } = useYoutubeStore();
  return (
    <Layout>
      <Expand>{sourceType === "channel" && <SourceLinkChannel />}</Expand>
      <ProcessButton nextStep="sourceFilter" prevStep="sourceType" />
    </Layout>
  );
};
