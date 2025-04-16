import { useEffect, useState } from "react";

type TextPreset =
  | "hero"
  | "display"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "button";

type PaddingPreset = "section" | "block" | "compact" | "none";

type LottiePreset = "spinner" | "loading" | "success" | "error";

export const useStyle = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const textSizeMap: Record<TextPreset, { desktop: string; mobile: string }> = {
    hero: { desktop: "text-9xl", mobile: "text-6xl" },
    display: { desktop: "text-6xl", mobile: "text-3xl" },
    title: { desktop: "text-4xl", mobile: "text-2xl" },
    subtitle: { desktop: "text-2xl", mobile: "text-xl" },
    body: { desktop: "text-base", mobile: "text-sm" },
    caption: { desktop: "text-sm", mobile: "text-xs" },
    button: { desktop: "text-sm", mobile: "text-xs" },
  };

  const paddingMap: Record<PaddingPreset, { desktop: string; mobile: string }> =
    {
      section: { desktop: "px-16 py-24", mobile: "px-4 py-10" },
      block: { desktop: "px-8 py-12", mobile: "px-4 py-6" },
      compact: { desktop: "px-4 py-4", mobile: "px-2 py-2" },
      none: { desktop: "p-0", mobile: "p-0" },
    };

  const lottieSizeMap: Record<
    LottiePreset,
    { desktop: number; mobile: number }
  > = {
    spinner: { desktop: 64, mobile: 48 },
    loading: { desktop: 100, mobile: 60 },
    success: { desktop: 80, mobile: 50 },
    error: { desktop: 80, mobile: 50 },
  };

  return {
    text: (preset: TextPreset) =>
      textSizeMap[preset][isMobile ? "mobile" : "desktop"],
    padding: (preset: PaddingPreset) =>
      paddingMap[preset][isMobile ? "mobile" : "desktop"],
    lottie: (preset: LottiePreset) =>
      lottieSizeMap[preset][isMobile ? "mobile" : "desktop"],
  };
};
