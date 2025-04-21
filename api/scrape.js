import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "유효한 URL이 필요합니다." });
  }

  try {
    // 1. 외부 블로그 페이지 fetch
    const html = await fetch(url).then((r) => r.text());
    const $ = cheerio.load(html);

    // 2. iframe 내부 src 추출
    const iframeSrc = $("iframe#mainFrame").attr("src");
    if (!iframeSrc) {
      return res.status(500).json({ error: "본문 iframe을 찾을 수 없습니다." });
    }

    const base = new URL(url).origin;
    const iframeUrl = `${base}${iframeSrc}`;

    // 3. iframe 내부 fetch
    const iframeHtml = await fetch(iframeUrl).then((r) => r.text());
    const $$ = cheerio.load(iframeHtml);

    // 4. 제목 추출 (여러 selector 대응)
    const title =
      $$(".se-title-text").text().trim() ||
      $$("#post-title").text().trim() ||
      $$("title").text().trim();

    // 5. 본문 내용 추출
    const content =
      $$(".se-main-container").text().trim() ||
      $$("#postViewArea").text().trim() ||
      $$("#contentArea").text().trim();

    // 6. 좋아요 수 추출 (가능한 경우)
    const like =
      $(".u_likeit_list_count").text().trim() || // 외부에서
      $$(".u_likeit_list_count").text().trim() || // iframe 내부에서
      null;

    const cleanedContent = content
      .replace(/\n\s*\n/g, "\n\n") // 중복 줄 제거
      .replace(/\s+/g, " ") // 공백 정리
      .trim();

    return res.status(200).json({
      title,
      content: cleanedContent,
      like,
      source: iframeUrl,
    });
  } catch (err) {
    return res.status(500).json({
      error: "파싱 중 오류 발생",
      detail: err.message,
    });
  }
}
