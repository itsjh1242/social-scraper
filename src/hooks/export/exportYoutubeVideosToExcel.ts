import { YoutubeChannelSchema } from "@/schemas/youtubeChannelSchema";
import { YouTubeVideoSchema } from "@/schemas/youtubeVideoSchema";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { parseKoreanDate } from "../func/formatDate";
import { getYoutubeCategoryName } from "../func/getYoutubeCategoryName";
import { formatDuration } from "../func/parseISODuration";

export const exportVideosToExcel = (
  channel: YoutubeChannelSchema,
  videos: YouTubeVideoSchema[],
) => {
  const videoRows = videos.map((v) => {
    const date = parseKoreanDate(v.publishedAt);
    return {
      제목: v.title,
      영상ID: v.videoId,
      채널명: v.channelTitle,
      업로드일: date.fullText,
      업로드_년: date.year,
      업로드_월: date.month,
      업로드_일: date.day,
      길이: formatDuration(v.duration),
      조회수: v.viewCount,
      좋아요: v.likeCount,
      댓글: v.commentCount,
      카테고리ID: v.categoryId,
      카테고리_이름: getYoutubeCategoryName(v.categoryId),
      태그: v.tags?.join(", "),
      설명: v.description || "",
      썸네일: v.thumbnail,
    };
  });

  const workbook = XLSX.utils.book_new();

  const videoSheet = XLSX.utils.json_to_sheet(videoRows);
  videoSheet["!cols"] = getColWidths(videoRows);

  const parsedChannelDate = parseKoreanDate(channel.publishedAt);
  const channelSheet = getChannelInfoSheet(channel, parsedChannelDate);
  channelSheet["!cols"] = getColWidths([
    {
      채널ID: channel.id,
      채널명: channel.title,
      커스텀URL: channel.customUrl || "",
      개설일: parsedChannelDate.fullText,
      개설_년: parsedChannelDate.year,
      개설_월: parsedChannelDate.month,
      개설_일: parsedChannelDate.day,
      국적: channel.country || "",
      설명: channel.description || "",
      구독자수: channel.statistics.subscriberCount,
      총조회수: channel.statistics.viewCount,
      총영상수: channel.statistics.videoCount,
      썸네일: channel.thumbnails.high,
    },
  ]);

  XLSX.utils.book_append_sheet(workbook, channelSheet, "Channel Info");
  XLSX.utils.book_append_sheet(workbook, videoSheet, "Videos");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, getExportFileName(channel.title));
};

const getExportFileName = (channelTitle?: string) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const safeTitle = (channelTitle || "YouTube_Channel").replace(
    /[\\/:*?"<>|]/g,
    "",
  );

  return `${safeTitle}_YouTube_Videos_Data_${yyyy}-${mm}-${dd}.xlsx`;
};

const getChannelInfoSheet = (
  channel: YoutubeChannelSchema,
  parsedDate: ReturnType<typeof parseKoreanDate>,
) => {
  const info = {
    채널ID: channel.id,
    채널명: channel.title,
    커스텀URL: channel.customUrl || "",
    개설일: parsedDate.fullText,
    개설_년: parsedDate.year,
    개설_월: parsedDate.month,
    개설_일: parsedDate.day,
    국적: channel.country || "",
    설명: channel.description || "",
    구독자수: channel.statistics.subscriberCount,
    총조회수: channel.statistics.viewCount,
    총영상수: channel.statistics.videoCount,
    썸네일: channel.thumbnails.high,
  };

  return XLSX.utils.json_to_sheet([info]);
};

const getColWidths = <T extends object>(rows: T[]): { wch: number }[] => {
  if (rows.length === 0) return [];

  const keys = Object.keys(rows[0]) as (keyof T)[];
  return keys.map((key) => {
    const headerLength = String(key).length * 2; // ✅ 한글 헤더 대응용 *2
    const maxContentLength = Math.max(
      ...rows.map((row) => (row[key] ? String(row[key]).length : 0)),
    );

    const finalLength = Math.max(headerLength, maxContentLength);
    return { wch: Math.max(Math.min(finalLength + 2, 60), 12) }; // ✅ 최소 12, 최대 60
  });
};
