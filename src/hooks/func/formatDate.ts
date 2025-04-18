export const parseKoreanDate = (iso: string) => {
  const d = new Date(iso);
  const local = new Date(d.getTime() + 9 * 60 * 60 * 1000); // 한국 시간

  const year = local.getFullYear();
  const month = local.getMonth() + 1;
  const day = local.getDate();

  return {
    fullText: `${year}년 ${String(month).padStart(2, "0")}월 ${String(day).padStart(2, "0")}일`,
    year,
    month,
    day,
    compact: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    dotted: `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`,
  };
};
