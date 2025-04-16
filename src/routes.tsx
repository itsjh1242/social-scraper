// react
import { Route, Routes } from "react-router-dom";
// components
import { RootLayout } from "@/components/layout/root";
// view
import { ExamplePage, HomePage, YoutubePage } from "@/views";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/example" element={<ExamplePage />} />

        {/* Youtube */}
        <Route path="/youtube" element={<YoutubePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
