import { searchChannelIdByKeyword } from "./fetchChannelIdByKeyword";

export const resolveChannelIdFromInput = async (
  input: string,
): Promise<string | null> => {
  try {
    // 1. 채널 ID 그대로 입력된 경우
    if (/^UC[\w-]{20,}$/.test(input)) {
      return input;
    }

    // 2. URL이 아닌 경우 → 강제 변환 or 에러
    if (!/^https?:\/\//.test(input)) {
      throw new Error("유효한 유튜브 채널 URL 또는 ID를 입력해주세요.");
    }

    // 3. URL 파싱
    const parsed = new URL(input);
    const pathname = decodeURIComponent(parsed.pathname);

    // /channel/ID 형식
    if (pathname.startsWith("/channel/")) {
      return pathname.replace("/channel/", "");
    }

    // /@handle 또는 /c/custom 형식
    const match = pathname.match(/^\/(?:@|c\/)([^/]+)$/);
    if (match) {
      const keyword = match[1];
      return await searchChannelIdByKeyword(keyword);
    }

    return null;
  } catch (e) {
    console.error("❌ 채널 ID 추출 실패:", e);
    return null;
  }
};

export const resolveVideoIdFromInput = async (
  input: string,
): Promise<string | null> => {
  try {
    // 1. Video ID 직접 입력된 경우 (11자, 알파벳+숫자+하이픈/언더바)
    if (/^[\w-]{11}$/.test(input)) {
      return input;
    }

    // 2. URL 형태가 아닌 경우 → 에러
    if (!/^https?:\/\//.test(input)) {
      throw new Error("유효한 유튜브 동영상 URL 또는 ID를 입력해주세요.");
    }

    // 3. URL 파싱
    const parsed = new URL(input);
    const pathname = decodeURIComponent(parsed.pathname);

    // ?v=xxxxxx 형식
    const vParam = parsed.searchParams.get("v");
    if (vParam && /^[\w-]{11}$/.test(vParam)) {
      return vParam;
    }

    // /shorts/xxxxx 형식 지원
    const shortsMatch = pathname.match(/^\/shorts\/([\w-]{11})$/);
    if (shortsMatch) {
      return shortsMatch[1];
    }

    return null;
  } catch (e) {
    console.error("❌ 동영상 ID 추출 실패:", e);
    return null;
  }
};
