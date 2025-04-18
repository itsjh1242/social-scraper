export interface YoutubeChannelSchema {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  customUrl?: string;
  country?: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
  };
  statistics: {
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
  };
}
