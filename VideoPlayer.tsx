import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Heart, MessageCircle, Share2, Music2 } from 'lucide-react-native';

const { height, width } = Dimensions.get('window');

interface Props {
  item: any;
  isActive: boolean;
}

export const VideoPlayer = ({ item, isActive }: Props) => {
  const video = useRef<Video>(null);

  useEffect(() => {
    if (isActive) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: item.uri }}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={isActive}
      />
      
      {/* واجهة التحكم الجانبية */}
      <View style={styles.rightControls}>
        <TouchableOpacity style={styles.iconBtn}>
          <Heart color="white" size={35} fill={item.isLiked ? "red" : "none"} />
          <Text style={styles.iconText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <MessageCircle color="white" size={35} />
          <Text style={styles.iconText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Share2 color="white" size={35} />
          <Text style={styles.iconText}>مشاركة</Text>
        </TouchableOpacity>
      </View>

      {/* تفاصيل الفيديو السفلى */}
      <View style={styles.bottomDetails}>
        <Text style={styles.author}>@{item.author}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.musicRow}>
          <Music2 color="white" size={15} />
          <Text style={styles.musicText}>الصوت الأصلي - {item.author}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width, height: height - 80, backgroundColor: 'black' },
  video: { flex: 1 },
  rightControls: { position: 'absolute', right: 10, bottom: 100, alignItems: 'center' },
  iconBtn: { marginBottom: 20, alignItems: 'center' },
  iconText: { color: 'white', fontSize: 12, marginTop: 5, fontWeight: 'bold' },
  bottomDetails: { position: 'absolute', bottom: 20, left: 10, right: 60, alignItems: 'flex-start' },
  author: { color: 'white', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  description: { color: 'white', fontSize: 14, marginBottom: 10, textAlign: 'left' },
  musicRow: { flexDirection: 'row', alignItems: 'center' },
  musicText: { color: 'white', marginLeft: 5, fontSize: 13 }
});