import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useYoutubeStore } from "@/stores/youtubeStore";
import { activeSocials } from "./active-socials";

export const StartDropdownMenu = () => {
  const { reset: YouTubeStoreReset } = useYoutubeStore();

  const handleLinkClick = (name: string) => {
    if (name === "Youtube") {
      YouTubeStoreReset();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg">시작하기</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {activeSocials.map((active) => (
            <DropdownMenuItem
              key={active.name}
              className="flex items-center justify-between"
              disabled={active.disabled}
              onClick={() => handleLinkClick(active.name)}
              asChild
            >
              <a
                href={`${import.meta.env.VITE_BROWSER_ROUTER_BASE_NAME}${active.link}`}
                className="flex items-center gap-2"
              >
                {active.icon}
                {active.name}
                <DropdownMenuShortcut>{active.shortcut}</DropdownMenuShortcut>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
