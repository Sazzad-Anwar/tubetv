import { ChannelType } from '@/types'
import { ApiRoutes } from '@/utils/routes'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { StyleProps } from 'react-native-reanimated'
import { KeyedMutator } from 'swr'
import VideoListLoader from './Loader'
import VideoCard from './VideoCard'
import VideoListEmpty from './VideoListEmpty'

type Props = {
  channels: ChannelType[]
  style?: StyleProps
  isLoading?: boolean
  mutate?: KeyedMutator<string[]>
  fetchMore?: () => void
}

export default function VideoList({
  channels,
  style,
  isLoading,
  mutate,
  fetchMore,
}: Props) {
  const { width } = Dimensions.get('screen')
  const router = useRouter()
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  const styles = StyleSheet.create({
    tvListContainer: {
      height: 'auto',
      marginBottom: Platform.OS === 'android' ? 60 : 20,
    },
    card: {
      height: 'auto',
      width: isMobile ? '100%' : isTablet ? '45%' : isDesktop ? '30%' : '100%',
      shadowColor: '#000',
      overflow: 'hidden',
      marginTop: 5,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      marginBottom: 0,
    },
    cardBody: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    cardTitle: {
      padding: 0,
      margin: 0,
      fontSize: 16,
    },
    cardImage: {
      height: 240,
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
  })

  if (isLoading) {
    return <VideoListLoader />
  }

  return (
    <ScrollView style={{ ...styles.tvListContainer, width, ...style }}>
      {channels?.length > 0 && (
        <FlashList
          data={channels}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 20 }}
          extraData={channels.length}
          onEndReached={() => console.log('on end reached')}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <Pressable
              key={item.key}
              onPress={() =>
                router.push(`${ApiRoutes.newsVideo}?id=${item?.id}`)
              }
              style={styles.card}
            >
              <VideoCard id={item?.id} />
            </Pressable>
          )}
          numColumns={isMobile ? 1 : isTablet ? 3 : 2}
          centerContent={true}
          refreshing={isLoading || false}
          onRefresh={() => mutate?.(undefined, { revalidate: true })}
          ListEmptyComponent={() => <VideoListEmpty />}
          estimatedItemSize={200}
        />
      )}
    </ScrollView>
  )
}
