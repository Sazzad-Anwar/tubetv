import { ChannelType } from '@/types'
import React from 'react'
import { Dimensions, FlatList, Platform, StyleSheet } from 'react-native'
import { StyleProps } from 'react-native-reanimated'
import { KeyedMutator } from 'swr'
import { ThemedView } from '../ThemedView'
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
  const { width, height } = Dimensions.get('window')
  const isMobile = width < 768
  const isTablet = width >= 768 && width < 1024
  const isDesktop = width >= 1024

  const styles = StyleSheet.create({
    tvListContainer: {
      height,
      marginBottom: Platform.OS === 'android' ? 60 : 20,
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
    <ThemedView style={{ ...styles.tvListContainer, width, ...style }}>
      {channels?.length > 0 && (
        <FlatList
          data={channels}
          keyExtractor={(item) => item.key}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={20}
          initialNumToRender={8}
          windowSize={21}
          contentContainerStyle={{ paddingBottom: 150, flexGrow: 1 }}
          onEndReachedThreshold={3}
          renderItem={({ item }) => <VideoCard {...item} />}
          numColumns={isMobile ? 1 : isTablet ? 3 : 2}
          refreshing={!!isLoading}
          onRefresh={() => mutate?.(undefined, { revalidate: true })}
          ListEmptyComponent={() => <VideoListEmpty />}
          onEndReached={() => fetchMore?.()}
        />
      )}
    </ThemedView>
  )
}
