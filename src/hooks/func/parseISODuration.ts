/**
 * @description Parses an ISO 8601 duration string into an object with hours, minutes, and seconds.
 * @param iso ISO 8601 duration string
 * @returns
 */
export const parseISODuration = (iso: string) => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [, h = "0", m = "0", s = "0"] = iso.match(regex) || [];
  return {
    hours: Number(h),
    minutes: Number(m),
    seconds: Number(s),
  };
};

export const formatDuration = (d: string) => {
  const { hours, minutes, seconds } = parseISODuration(d);
  return [
    hours && `${hours}시간`,
    minutes && `${minutes}분`,
    seconds && `${seconds}초`,
  ]
    .filter(Boolean)
    .join(" ");
};
