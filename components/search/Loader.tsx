import { ScrollView } from 'react-native'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemedView } from '../ThemedView'
import useSearchStyle from './useStyle'

export default function LoaderSearch() {
  const styles = useSearchStyle()
  const backgroundColor = useThemeColor({}, 'background')
  const backgroundColor2 = useThemeColor({}, 'background2')

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
