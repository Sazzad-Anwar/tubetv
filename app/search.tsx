import { ThemedInput } from '@/components/ThemedInput'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import useYoutubeMeta from '@/hooks/useYoutubeMeta'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Stack, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptySearch from '../components/search/EmptySearch'
import LoaderSearch from '../components/search/Loader'
import SearchCard from '../components/search/SearchCard'
import useSearchStyle from '../components/search/useStyle'

export default function Search() {
  const {
    channels,
    setSearch: setQuery,
    isLoading,
    mutate,
    fetchMore,
  } = useYoutubeMeta()
  const [isEmpty, setIsEmpty] = useState(false)
  const { height, width } = Dimensions.get('window')
  const [search, setSearch] = useState('')
  const styles = useSearchStyle()
  const color = useThemeColor({}, 'icon')
  const router = useRouter()

  useEffect(() => {
    if (search) {
      setQuery(search)
    }
  }, [search])

  useEffect(() => {
    let timeOut: any
    if (!isLoading || typeof isLoading === 'undefined') {
      timeOut = setTimeout(() => {
        setIsEmpty(channels?.length === 0 ? true : false)
      }, 3000)
    }

    if (isLoading || typeof isLoading === 'undefined') {
      clearTimeout(timeOut)
      setIsEmpty(false)
    }

    if (channels.length > 0) {
      setIsEmpty(false)
    }

    return () => clearTimeout(timeOut)
  }, [channels.length])

  if (isLoading) {
    return (
      <SafeAreaView>
        <Stack.Screen options={{ headerShown: false }} />
        <ThemedView style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.backNavigation}
            onPress={() => router.back()}
          >
            <ThemedText type="subtitle">
              <FontAwesome
                name="angle-left"
                size={30}
              />
            </ThemedText>
          </TouchableOpacity>
          <ThemedInput
            clearButtonMode="always"
            style={styles.search}
            placeholderTextColor={color}
            onChangeText={(text) => {
              setSearch(text)
            }}
            placeholder="Search..."
          />
        </ThemedView>
        <LoaderSearch />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{ headerShown: false, animation: 'slide_from_right' }}
      />
      <ThemedView style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.backNavigation}
          onPress={() => router.back()}
        >
          <ThemedText type="subtitle">
            <FontAwesome
              name="angle-left"
              size={20}
            />
          </ThemedText>
        </TouchableOpacity>
        <ThemedInput
          value={search}
          clearButtonMode="always"
          style={styles.search}
          onChangeText={(text) => {
            setSearch(text)
          }}
          placeholder="Search by channel name..."
        />
      </ThemedView>
      {isEmpty ? (
        <EmptySearch />
      ) : (
        <ThemedView
          style={{
            height,
            marginTop: 10,
          }}
        >
          <FlatList
            data={channels}
            keyExtractor={(item) => item.key}
            extraData={search}
            contentContainerStyle={{ paddingBottom: 110 }}
            onEndReachedThreshold={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={10}
            initialNumToRender={10}
            windowSize={21}
            onEndReached={() => fetchMore?.()}
            refreshing={isLoading || false}
            ListFooterComponent={() => isLoading && <LoaderSearch />}
            onRefresh={() => mutate(undefined, { revalidate: true })}
            renderItem={({ item }) => (
              <SearchCard
                key={item?.id}
                item={item}
              />
            )}
            ListEmptyComponent={() => <LoaderSearch />}
          />
        </ThemedView>
      )}
    </SafeAreaView>
  )
}
