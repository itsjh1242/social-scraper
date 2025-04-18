import {
  YouTubeCommentSchema,
  YouTubeVideoSchema,
} from "@/schemas/youtubeVideoSchema";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { parseKoreanDate } from "../func/formatDate";
import { getYoutubeCategoryName } from "../func/getYoutubeCategoryName";
import { formatDuration } from "../func/parseISODuration";

export const exportCommentsToExcel = (
  video: YouTubeVideoSchema,
  comments: YouTubeCommentSchema[],
) => {
  const videoDate = parseKoreanDate(video.publishedAt);

  // 1. 설명을 제외한 영상 정보
  const baseVideoInfo = {
    제목: video.title,
    영상ID: video.videoId,
    채널명: video.channelTitle,
    업로드일: videoDate.fullText,
    업로드_년: videoDate.year,
    업로드_월: videoDate.month,
    업로드_일: videoDate.day,
    길이: formatDuration(video.duration),
    조회수: video.viewCount,
    좋아요: video.likeCount,
    댓글수: video.commentCount,
    카테고리ID: video.categoryId,
    카테고리_이름: getYoutubeCategoryName(video.categoryId),
    태그: video.tags?.join(", "),
    썸네일: video.thumbnail,
  };

  const headerRow = Object.keys(baseVideoInfo);
  const dataRow = headerRow.map(
    (key) => baseVideoInfo[key as keyof typeof baseVideoInfo],
  );

  const labelRow = ["설명"];
  const descriptionRow = [video.description || ""];

  const videoSheet = XLSX.utils.aoa_to_sheet([
    headerRow,
    dataRow,
    labelRow,
    descriptionRow,
  ]);

  const totalCols = headerRow.length;

  // 병합 설정: 설명 라벨 & 설명 내용 둘 다 병합
  videoSheet["!merges"] = [
    {
      s: { r: 2, c: 0 }, // 설명 라벨 (3행)
      e: { r: 2, c: totalCols - 1 },
    },
    {
      s: { r: 3, c: 0 }, // 설명 내용 (4행)
      e: { r: 3, c: totalCols - 1 },
    },
  ];

  videoSheet["!cols"] = getColWidths([baseVideoInfo]);

  // 2. 댓글 시트
  const commentData = comments.map((c) => {
    const date = parseKoreanDate(c.publishedAt);
    return {
      댓글ID: c.id,
      영상ID: c.videoId,
      작성자: c.author,
      내용: c.text,
      좋아요: c.likeCount,
      작성일: date.fullText,
      작성_년: date.year,
      작성_월: date.month,
      작성_일: date.day,
    };
  });

  const commentSheet = XLSX.utils.json_to_sheet(commentData);
  commentSheet["!cols"] = getColWidths(commentData);

  // 3. 파일 저장
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, videoSheet, "Video Info");
  XLSX.utils.book_append_sheet(workbook, commentSheet, "Comments");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, getExportFileName(video.title));
};

const getExportFileName = (title: string) => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  const safeTitle = title.replace(/[\\/:*?"<>|]/g, "");
  return `${safeTitle}_YouTube_Comments_Data_${yyyy}-${mm}-${dd}.xlsx`;
};

const getColWidths = <T extends object>(rows: T[]): { wch: number }[] => {
  if (rows.length === 0) return [];

  const keys = Object.keys(rows[0]) as (keyof T)[];
  return keys.map((key) => {
    const headerLength = String(key).length * 2;
    const maxContentLength = Math.max(
      ...rows.map((row) => (row[key] ? String(row[key]).length : 0)),
    );
    const finalLength = Math.max(headerLength, maxContentLength);
    return { wch: Math.max(Math.min(finalLength + 2, 60), 12) };
  });
};
