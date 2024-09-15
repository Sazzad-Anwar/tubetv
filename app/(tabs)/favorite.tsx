import Header from '@/components/Header'
import VideoList from '@/components/video/VideoList'
import useFavoriteItems from '@/hooks/useFavoriteItems'
import { Stack, usePathname } from 'expo-router'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TabTwoScreen() {
  const { favoriteItems, getItems } = useFavoriteItems()
  const pathName = usePathname()

  useEffect(() => {
    getItems()
  }, [pathName])

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />
      <VideoList channels={favoriteItems} />
    </SafeAreaView>
  )
}
