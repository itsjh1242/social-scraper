import { Button } from "@/components/ui/button";
import { setDarkMode, setLightMode } from "@/hooks/theme/mode";

export const HomePage: React.FC = () => {
  return (
    <section>
      <p className="font-bold">This is the home page.</p>
      <div className="flex space-x-4">
        <Button onClick={setLightMode}>라이트모드</Button>
        <Button onClick={setDarkMode} variant="outline">
          다크모드
        </Button>
      </div>
    </section>
  );
};
