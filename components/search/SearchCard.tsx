import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ChannelType } from '../../types'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'
import useSearchStyle from './useStyle'

const SearchCard = ({ item }: { item: ChannelType }) => {
  const borderColor = useThemeColor({}, 'border')
  const styles = useSearchStyle()

  const router = useRouter()

  return (
    <TouchableOpacity
      key={item.key}
      onPress={() => router.push(`/news-video?id=${item?.id}`)}
    >
      <ThemedView style={{ ...styles.titleContainer, ...styles.content }}>
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
  )
}

export default memo(SearchCard)
