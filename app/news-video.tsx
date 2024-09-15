import Header from '@/components/Header'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import VideoList from '@/components/video/VideoList'
import useFavoriteItems from '@/hooks/useFavoriteItems'
import useYoutubeMeta from '@/hooks/useYoutubeMeta'
import { ApiRoutes } from '@/utils/routes'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import YoutubeIframe, {
  YoutubeMeta,
  getYoutubeMeta,
} from 'react-native-youtube-iframe'

enum VideoEnum {
  unstarted = 'unstarted',
  videoCue = 'video cue',
  buffering = 'buffering',
  playing = 'playing',
  paused = 'paused',
  ended = 'ended',
}

export default function NewsVideo() {
  const [youtubeMeta, setYoutubeMeta] = useState<YoutubeMeta>()
  const params = useLocalSearchParams()
  const { id } = params
  const [playing, setPlaying] = useState(true)
  const { width, height } = Dimensions.get('screen')
  const [videoHeight, setVideoHeight] = useState(
    Dimensions.get('window').width * 0.56,
  )
  const router = useRouter()
  const { channels, mutate, isLoading } = useYoutubeMeta()
  const { favoriteItems, toggleFavorite } = useFavoriteItems()
  useEffect(() => {
    const getMeta = async (id: string) => {
      const meta = await getYoutubeMeta(id)
      setYoutubeMeta(meta)
    }
    getMeta(id as string)
  }, [])

  const onStateChange = useCallback((state: any) => {
    if (state === VideoEnum.ended) {
      setPlaying(false)
      Alert.alert('Live is ended!')
      router.push(ApiRoutes.home)
    }
    if (
      ![
        VideoEnum.ended,
        VideoEnum.paused,
        VideoEnum.playing,
        VideoEnum.videoCue,
        VideoEnum.buffering,
        VideoEnum.unstarted,
      ].includes(state)
    ) {
      onError('Live is not available')
    }
  }, [])

  const onError = async (error: string) => {
    console.log(error)
    Alert.alert(`Live is not available for ${youtubeMeta?.author_name} ${id}`)
    router.push(ApiRoutes.home)
  }

  const toggleFullScreen = async (isFullScreen: boolean) => {
    await ScreenOrientation.lockAsync(
      isFullScreen
        ? ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
        : ScreenOrientation.OrientationLock.DEFAULT,
    )
    await ScreenOrientation.lockPlatformAsync({
      screenOrientationArrayIOS: [
        isFullScreen
          ? ScreenOrientation.Orientation.LANDSCAPE_RIGHT
          : ScreenOrientation.Orientation.PORTRAIT_UP,
      ],
    })
    setVideoHeight(Dimensions.get('window').width * 0.56)
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <Header />
      <ThemedView style={{ ...styles.videoContainer, height: videoHeight }}>
        <YoutubeIframe
          height={videoHeight} // 16:9 aspect ratio
          width={width}
          videoId={id as string}
          play={playing}
          mute={false} // Mute the video
          volume={100}
          initialPlayerParams={{ showClosedCaptions: false, controls: true }}
          onFullScreenChange={async (fullScreen) =>
            toggleFullScreen(fullScreen)
          }
          onError={onError}
          onChangeState={onStateChange} // Handle video state change
        />
        <TouchableOpacity style={styles.loveIcon}>
          <Ionicons
            name={
              favoriteItems?.find((item) => item.id === id)
                ? 'heart'
                : 'heart-outline'
            }
            onPress={() => toggleFavorite(id as string)}
            size={35}
            color="red"
          />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedView style={styles.roundedImageContainer}>
          <Image
            style={styles.roundedImage}
            source={{ uri: youtubeMeta?.thumbnail_url, height: 50, width: 50 }}
          />
        </ThemedView>
        <ThemedView style={{ gap: 0 }}>
          <ThemedText
            type="title"
            style={styles.cardTitle}
            numberOfLines={1}
          >
            {youtubeMeta?.author_name}
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={styles.cardSubTitle}
            numberOfLines={1}
          >
            {youtubeMeta && youtubeMeta?.title?.length > 40
              ? youtubeMeta?.title.substring(0, 40) + '...'
              : youtubeMeta?.title}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <VideoList
        channels={channels}
        mutate={mutate}
        isLoading={isLoading}
        style={{
          height:
            Platform.OS === 'android'
              ? height - Dimensions.get('window').width * 0.56 - 160
              : height - Dimensions.get('window').width * 0.56 - 200,
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 280,
    width: 'auto',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 30,
  },
  videoContainer: {
    position: 'relative',
  },
  loveIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 50,
    width: 50,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roundedImageContainer: {
    height: 54,
    width: 54,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  roundedImage: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  cardTitle: {
    padding: 0,
    margin: 0,
    fontSize: 16,
    lineHeight: 16,
    paddingBottom: 3,
    fontWeight: '500',
  },
  cardSubTitle: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    fontWeight: '400',
  },
})
