export const isValidNaverBlogUrl = (url: string) => {
  try {
    const pattern = /^https:\/\/blog\.naver\.com\/([a-zA-Z0-9._-]+)\/([0-9]+)$/;
    const legacyPattern =
      /^https:\/\/blog\.naver\.com\/PostView\.naver\?blogId=([a-zA-Z0-9._-]+)&logNo=([0-9]+)$/;

    return pattern.test(url) || legacyPattern.test(url);
  } catch (error) {
    console.error("❌ URL 유효성 검사 실패:", error);
    return null;
  }
};
