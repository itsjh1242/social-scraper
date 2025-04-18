import { useYoutubeStore } from "@/stores/youtubeStore";
import { Expand, Layout } from "../layout";
import { ProcessButton } from "../process-button";
import { SourceFilterChannel } from "./channel";

export const SourceFilter: React.FC = () => {
  const { sourceType } = useYoutubeStore();
  return (
    <Layout>
      <Expand>{sourceType === "channel" && <SourceFilterChannel />}</Expand>
      <ProcessButton prevStep="sourceLink" />
    </Layout>
  );
};
