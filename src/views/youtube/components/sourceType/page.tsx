import { Expand, Layout } from "../layout";
import { ProcessButton } from "../process-button";
import { SourceTypeFeature } from "./feature";

/**
 * @description 유튜브 채널, 동영상 중 하나를 선택
 */
export const SourceType: React.FC = () => {
  return (
    <Layout>
      <Expand>
        <SourceTypeFeature />
      </Expand>
      <ProcessButton nextStep="sourceLink" />
    </Layout>
  );
};
