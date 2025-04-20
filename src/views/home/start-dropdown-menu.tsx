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
import { FaYoutube } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";

const LINKS = [
  {
    name: "Youtube",
    icon: <FaYoutube className="text-red-500" />,
    shortcut: "개발 중",
    disabled: false,
    link: "/youtube",
  },
  {
    name: "Instagram",
    icon: <PiInstagramLogoFill className="text-pink-500" />,
    shortcut: "준비 중",
    disabled: true,
    link: "/instagram",
  },
];

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
          {LINKS.map((link) => (
            <DropdownMenuItem
              key={link.name}
              className="flex items-center justify-between"
              disabled={link.disabled}
              onClick={() => handleLinkClick(link.name)}
              asChild
            >
              <a
                href={`${import.meta.env.VITE_BROWSER_ROUTER_BASE_NAME}${link.link}`}
                className="flex items-center gap-2"
              >
                {link.icon}
                {link.name}
                <DropdownMenuShortcut>{link.shortcut}</DropdownMenuShortcut>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
