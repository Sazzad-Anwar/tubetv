import useFavoriteItems from '@/hooks/useFavoriteItems'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { Href, usePathname, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { YoutubeMeta, getYoutubeMeta } from 'react-native-youtube-iframe'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'

export default function VideoCard({ id }: { id: string }) {
  const { width } = Dimensions.get('screen')
  const [youtubeMeta, setYoutubeMeta] = useState<YoutubeMeta>()
  const { favoriteItems, toggleFavorite, getItems } = useFavoriteItems()
  const pathName = usePathname()
  const router = useRouter()

  useEffect(() => {
    const getMeta = async () => {
      const meta = await getYoutubeMeta(id)
      setYoutubeMeta(meta)
    }
    getMeta()
    getItems()
  }, [pathName])

  return (
    <ThemedView style={{ position: 'relative' }}>
      <Image
        source={{ uri: youtubeMeta?.thumbnail_url }}
        alt={youtubeMeta?.title}
        style={{
          ...styles.cardImage,
          width,
        }}
      />
      <ThemedView style={styles.cardBody}>
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
      <TouchableOpacity style={styles.loveIcon}>
        <Ionicons
          name={
            favoriteItems?.find((item) => item.id === id)
              ? 'heart'
              : 'heart-outline'
          }
          onPress={() => {
            toggleFavorite(id as string)
            router.replace(pathName as Href<String>)
          }}
          size={35}
          color="red"
        />
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  cardBody: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    padding: 0,
    margin: 0,
    fontSize: 16,
    lineHeight: 16,
    paddingBottom: 2,
    fontWeight: '500',
  },
  cardImage: {
    height: 240,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
  cardSubTitle: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    fontWeight: '400',
  },
})
