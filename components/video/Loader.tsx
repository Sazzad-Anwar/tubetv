import { Dimensions, StyleSheet } from 'react-native'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemedView } from '../ThemedView'

export default function VideoListLoader() {
  const { width } = Dimensions.get('screen')
  const bgColor1 = useThemeColor({}, 'background1')
  const bgColor2 = useThemeColor({}, 'background2')
  const borderColor = useThemeColor({}, 'border')

  const styles = StyleSheet.create({
    card: {
      height: 'auto',
      width: '100%',
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

  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <ThemedView
          key={`skeleton-${index}`}
          style={{
            ...styles.card,
            backgroundColor: bgColor1,
            borderColor,
          }}
        >
          <ThemedView
            key={`skeleton-${index}`}
            style={{
              ...styles.cardImage,
              width,
              borderWidth: 1,
              borderColor: bgColor1,
              backgroundColor: bgColor2,
            }}
          />
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
                backgroundColor: bgColor2,
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
                  backgroundColor: bgColor2,
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
                  backgroundColor: bgColor2,
                }}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ))}
    </>
  )
}
