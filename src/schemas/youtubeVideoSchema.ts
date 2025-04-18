export interface YouTubeVideoSchema {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration: string;
  tags?: string[];
  categoryId: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}
