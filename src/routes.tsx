// react
import { Route, Routes } from "react-router-dom";
// components
import { RootLayout } from "@/components/layout/root";
// view
import { ExamplePage, HomePage, NaverPage, YoutubePage } from "@/views";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/example" element={<ExamplePage />} />

        {/* Youtube */}
        <Route path="/youtube" element={<YoutubePage />} />
        {/* Naver */}
        <Route path="/naver" element={<NaverPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
