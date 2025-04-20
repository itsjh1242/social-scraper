import { useYoutubeStore } from "@/stores/youtubeStore";
import { Expand, Layout } from "../layout";
import { ProcessButton } from "../process-button";
import { SourceLinkChannel } from "./channel";
import { SourceLinkVideo } from "./video";

export const SourceLink: React.FC = () => {
  const { sourceType, sourceLinkComplete } = useYoutubeStore();

  return (
    <Layout>
      <Expand>
        {sourceType === "channel" && <SourceLinkChannel />}
        {sourceType === "video" && <SourceLinkVideo />}
      </Expand>
      <ProcessButton
        nextStep="sourceFilter"
        prevStep="sourceType"
        disabled={!sourceLinkComplete}
      />
    </Layout>
  );
};
