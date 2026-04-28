import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Dimensions, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Heart, MessageCircle, Share2, Plus, Music2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

// الحصول على أبعاد الشاشة
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

// بيانات تجريبية (فيديوهات من الإنترنت)
const INITIAL_DATA = [
  {
    id: '1',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-lighting-in-the-rain-44067-large.mp4',
    user: '@creative_mind',
    description: 'تحدي الترند الجديد في دبي! 🌟 #ترند #TikTok',
    likes: '1.2M',
  },
  {
    id: '2',
    uri: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-4725-large.mp4',
    user: '@nature_lover',
    description: 'جمال الطبيعة الخلابة في فصل الخريف 🍂✨',
    likes: '850K',
  },
];

export default function App() {
  const [videos, setVideos] = useState(INITIAL_DATA);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // وظيفة رفع فيديو جديد من جوالك
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newVideo = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        user: '@Me',
        description: 'فيديو جديد تم رفعه من هاتفي 🚀',
        likes: '0',
      };
      setVideos([newVideo, ...videos]); // إضافة الفيديو الجديد في بداية القائمة
    }
  };

  // مكون تشغيل الفيديو الفردي
  const VideoItem = ({ item, index }: { item: any, index: number }) => {
    const videoRef = useRef(null);
    const isActive = activeVideoIndex === index;

    return (
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.fullScreenVideo}
          source={{ uri: item.uri }}
          resizeMode={ResizeMode.COVER}
          shouldPlay={isActive} // يشتغل فقط إذا كان هو الفيديو المعروض حالياً
          isLooping
          isMuted={false}
        />
        
        {/* واجهة التحكم الجانبية (الأزرار) */}
        <View style={styles.rightButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Heart color="white" size={35} fill={index === 0 ? "red" : "none"} />
            <Text style={styles.iconText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MessageCircle color="white" size={35} />
            <Text style={styles.iconText}>120</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Share2 color="white" size={35} />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* معلومات الفيديو (الأسفل) */}
        <View style={styles.bottomInfo}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.musicContainer}>
            <Music2 color="white" size={18} />
            <Text style={styles.musicText}>الصوت الأصلي - {item.user}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* القائمة الرئيسية التي تسمح بالتمرير مثل تيك توك */}
      <FlatList
        data={videos}
        renderItem={({ item, index }) => <VideoItem item={item} index={index} />}
        keyExtractor={(item) => item.id}
        pagingEnabled // هذه الخاصية تجعل التمرير يقف عند كل فيديو بالضبط
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / WINDOW_HEIGHT);
          setActiveVideoIndex(index);
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* شريط التنقل السفلي */}
      <View style={styles.bottomBar}>
        <TouchableOpacity><Text style={styles.barText}>الرئيسية</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.barText}>اكتشف</Text></TouchableOpacity>
        <TouchableOpacity onPress={pickVideo} style={styles.uploadButton}>
          <Plus color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity><Text style={styles.barText}>الرسائل</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.barText}>الملف الشخصي</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  fullScreenVideo: {
    flex: 1,
  },
  rightButtons: {
    position: 'absolute',
    right: 15,
    bottom: 120,
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 100,
    left: 15,
    right: 80,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'left',
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
    paddingBottom: 20,
  },
  barText: {
    color: 'white',
    fontSize: 11,
  },
  uploadButton: {
    backgroundColor: 'white',
    width: 45,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});