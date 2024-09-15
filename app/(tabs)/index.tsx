import Header from '@/components/Header'
import VideoList from '@/components/video/VideoList'
import useYoutubeMeta from '@/hooks/useYoutubeMeta'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const { channels, isLoading, mutate, fetchMore } = useYoutubeMeta()

  return (
    <SafeAreaView>
      <Header />
      <VideoList
        isLoading={isLoading}
        mutate={mutate}
        channels={channels}
        fetchMore={fetchMore}
      />
    </SafeAreaView>
  )
}
