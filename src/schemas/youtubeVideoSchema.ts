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

export interface YouTubeCommentSchema {
  id: string;
  videoId: string;
  text: string;
  author: string;
  likeCount: number;
  publishedAt: string;
  isReply: boolean; // 댓글인지 대댓글인지 구분
  parentId?: string; // 대댓글이면 부모 ID
}
