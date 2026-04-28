// تعريف أنواع البيانات للمشروع بالكامل
export interface VideoPost {
  id: string;
  uri: string;
  author: string;
  description: string;
  likes: number;
  comments: number;
  isOffline?: boolean;
}