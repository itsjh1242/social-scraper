import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};
