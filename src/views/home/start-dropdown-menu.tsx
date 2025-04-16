import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
              asChild
            >
              <a href={link.link} className="flex items-center gap-2">
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
