import { ThemedInput } from '@/components/ThemedInput'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import useYoutubeMeta from '@/hooks/useYoutubeMeta'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { Stack, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Search() {
  const { channels, setSearch: setQuery, isLoading, mutate } = useYoutubeMeta()
  const [isEmpty, setIsEmpty] = useState(false)
  const { height, width } = Dimensions.get('window')
  const [search, setSearch] = useState('')
  const color = useThemeColor({}, 'icon')
  const backgroundColor = useThemeColor({}, 'background')
  const backgroundColor2 = useThemeColor({}, 'background2')
  const router = useRouter()
  const borderColor = useThemeColor({}, 'border')

  const styles = StyleSheet.create({
    searchContainer: {
      borderColor: 'transparent',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 0,
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    search: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 18,
      width: '100%',
    },
    backNavigation: {
      width: 35,
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 40,
      justifyContent: 'center',
      marginLeft: 10,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: borderColor,
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

  const Loader = () => {
    return (
      <ScrollView>
        {Array.from({ length: 20 }).map((_, index) => (
          <ThemedView
            style={{
              ...styles.content,
              backgroundColor,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            key={index}
          >
            <ThemedView
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
              }}
            >
              <ThemedView
                style={{
                  height: 54,
                  width: 54,
                  borderRadius: 35,
                  backgroundColor: backgroundColor2,
                }}
              />
              <ThemedView style={{ flex: 1, marginLeft: 10, gap: 10 }}>
                <ThemedView
                  style={{
                    ...styles.cardTitle,
                    width: '50%',
                    height: 25,
                    borderRadius: 6,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    backgroundColor: backgroundColor2,
                  }}
                />
                <ThemedView
                  style={{
                    ...styles.cardTitle,
                    width: '90%',
                    height: 20,
                    borderRadius: 6,
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'transparent',
                    backgroundColor: backgroundColor2,
                  }}
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>
        ))}
      </ScrollView>
    )
  }

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
        <Loader />
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
        <SafeAreaView>
          <Stack.Screen
            options={{ headerShown: false, animation: 'slide_from_right' }}
          />
          <ThemedView
            style={{
              width,
              height,
              backgroundColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ThemedView
              style={{
                backgroundColor,
                height: height / 2,
                alignItems: 'center',
                gap: 10,
              }}
            >
              <ThemedText
                style={{ fontWeight: '400' }}
                type="subtitle"
              >
                No channel found.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </SafeAreaView>
      ) : (
        <ScrollView
          style={{
            height,
            marginTop: 10,
          }}
        >
          <FlashList
            data={channels}
            keyExtractor={(item) => item.key}
            extraData={search}
            contentContainerStyle={{ paddingBottom: 110 }}
            onEndReached={() => console.log('on end reached')}
            onEndReachedThreshold={0.5}
            refreshing={isLoading || false}
            onRefresh={() => mutate(undefined, { revalidate: true })}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => router.push(`/news-video?id=${item?.id}`)}
              >
                <ThemedView
                  style={{ ...styles.titleContainer, ...styles.content }}
                >
                  <ThemedView style={styles.roundedImageContainer}>
                    <Image
                      style={styles.roundedImage}
                      source={{
                        uri: item?.thumbnail_url,
                        height: 50,
                        width: 50,
                      }}
                    />
                  </ThemedView>
                  <ThemedView style={{ gap: 0 }}>
                    <ThemedText
                      type="title"
                      style={styles.cardTitle}
                      numberOfLines={1}
                    >
                      {item?.author_name}
                    </ThemedText>
                    <ThemedText
                      type="subtitle"
                      style={styles.cardSubTitle}
                      numberOfLines={1}
                    >
                      {item && item?.title?.length > 40
                        ? item?.title.substring(0, 40) + '...'
                        : item?.title}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => <Loader />}
            estimatedItemSize={200}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
