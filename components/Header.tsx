import { useThemeColor } from '@/hooks/useThemeColor'
import { ApiRoutes } from '@/utils/routes'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Image } from 'expo-image'
import { Link, usePathname, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const color = useThemeColor({}, 'text')
  const borderColor = useThemeColor({}, 'border')

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor,
      borderBottomWidth: 1,
    },
    backNavigation: {
      width: 10,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 3,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
  })

  return (
    <ThemedView style={styles.header}>
      <View style={styles.container}>
        {pathname !== ApiRoutes.home && pathname.length !== 1 && (
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
        )}
        <TouchableOpacity
          onPress={() => router.push(ApiRoutes.home)}
          style={{ ...styles.container, gap: 3 }}
        >
          <Image
            source={require('../assets/images/icon.png')}
            style={{
              height: 40,
              width: 40,
            }}
          />
          <ThemedText
            type="subtitle"
            style={{ fontSize: 25, color: '#ff3830' }}
          >
            TubeTv
          </ThemedText>
        </TouchableOpacity>
      </View>
      <ThemedView
        style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
      >
        <TouchableOpacity>
          <Link href={ApiRoutes.search}>
            <Feather
              name="search"
              size={30}
              color={color}
            />
          </Link>
        </TouchableOpacity>
        {/* <Avatar */}
        {/*   size={40} */}
        {/*   initials="SA" */}
        {/*   uri="https://ui-avatars.com/api/?name=TubeTv&size=128" */}
        {/* /> */}
      </ThemedView>
    </ThemedView>
  )
}
