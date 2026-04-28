import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Heart, MessageCircle, Share2, Music2 } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

const { height, width } = Dimensions.get('window');

interface VideoPostProps {
  uri: string;
  user: string;
  description: string;
  isPaused: boolean;
}

export const VideoPost = ({ uri, user, description, isPaused }: VideoPostProps) => {
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri }}
        resizeMode={ResizeMode.COVER}
        shouldPlay={!isPaused}
        isLooping
        // ميزة التشغيل المتكرر حتى بدون نت تعتمد على الكاش (Cache) في Expo
      />
      
      <View style={styles.bottomSection}>
        <Text style={styles.userName}>@{user}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.musicContainer}>
          <Music2 color="white" size={18} />
          <Text style={styles.musicText}>الصوت الأصلي - {user}</Text>
        </View>
      </View>

      <View style={styles.sideBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart color="white" size={35} fill={COLORS.primary} />
          <Text style={styles.actionText}>1.2M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle color="white" size={35} />
          <Text style={styles.actionText}>450</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 color="white" size={35} />
          <Text style={styles.actionText}>شارك</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width, height: height - 80, backgroundColor: 'black' },
  video: { ...StyleSheet.absoluteFillObject },
  bottomSection: { position: 'absolute', bottom: 20, left: 10, width: '75%' },
  userName: { color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom: 5, textAlign: 'left' },
  description: { color: 'white', fontSize: 14, marginBottom: 10, textAlign: 'left' },
  musicContainer: { flexDirection: 'row', alignItems: 'center' },
  musicText: { color: 'white', marginLeft: 8 },
  sideBar: { position: 'absolute', right: 10, bottom: 40, alignItems: 'center' },
  actionButton: { alignItems: 'center', marginBottom: 20 },
  actionText: { color: 'white', marginTop: 5, fontSize: 12 }
});