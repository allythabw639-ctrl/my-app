import * as FileSystem from 'expo-file-system';

// ميزة تشغيل الفيديوهات بدون إنترنت (Caching System)
export const getCachedVideoUri = async (videoUrl: string, videoId: string) => {
  const fileName = `${videoId}.mp4`;
  const fileUri = `${FileSystem.documentDirectory}${fileName}`;

  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  
  if (fileInfo.exists) {
    console.log("تشغيل من الذاكرة المحلية (بدون إنترنت)");
    return fileUri;
  }

  console.log("تحميل الفيديو وتخزينه...");
  const downloadResumable = FileSystem.createDownloadResumable(videoUrl, fileUri);
  const result = await downloadResumable.downloadAsync();
  return result?.uri;
};