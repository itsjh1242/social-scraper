import { FaYoutube } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { SiNaver } from "react-icons/si";

export const activeSocials = [
  {
    name: "Youtube",
    icon: <FaYoutube className="text-red-500" />,
    color: "#FF0000",
    shortcut: "활성화",
    disabled: false,
    link: "/youtube",
  },
  {
    name: "Naver",
    icon: <SiNaver className="text-green-500" />,
    color: "#03C75A",
    shortcut: "개발중",
    disabled: false,
    link: "/naver",
  },
  {
    name: "Instagram",
    icon: <PiInstagramLogoFill className="text-pink-500" />,
    color: "#E1306C",
    shortcut: "비활성화",
    disabled: true,
    link: "/instagram",
  },
];
