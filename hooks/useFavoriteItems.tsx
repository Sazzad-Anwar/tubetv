import { ChannelType } from '@/types'
import { generateUniqueId } from '@/utils/tools'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { getYoutubeMeta } from 'react-native-youtube-iframe'

export default function useFavoriteItems() {
  const [favoriteItems, setFavoriteItems] = useState<ChannelType[]>([])

  const getItems = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favoriteItems')
      setFavoriteItems(
        jsonValue !== null ? JSON.parse(jsonValue as string) : [],
      )
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  const addToFavorite = async (item: ChannelType) => {
    try {
      const jsonValue = JSON.stringify([...favoriteItems, item])
      await AsyncStorage.setItem('favoriteItems', jsonValue)
      getItems()
    } catch (e) {
      console.log(e)
    }
  }

  const removeFromFavorite = async (item: ChannelType) => {
    try {
      const jsonValue = JSON.stringify(
        favoriteItems.filter((i) => i.id !== item.id),
      )
      await AsyncStorage.setItem('favoriteItems', jsonValue)
      getItems()
    } catch (e) {
      console.log(e)
    }
  }

  const toggleFavorite = async (id: string) => {
    let meta = await getYoutubeMeta(id)
    const payload = {
      ...meta,
      id,
      key: generateUniqueId(),
    }
    if (favoriteItems?.find((item) => item.id === id)) {
      removeFromFavorite(payload)
      Toast.show({
        type: 'success',
        text1: 'Removed from favorite',
        swipeable: true,
      })
    } else {
      addToFavorite(payload)
      Toast.show({
        type: 'success',
        text1: 'Added to favorite',
        swipeable: true,
      })
    }
  }

  return {
    favoriteItems,
    addToFavorite,
    removeFromFavorite,
    toggleFavorite,
    getItems,
  }
}
