import { MaterialCommunityIcons } from '@expo/vector-icons'
import { usePathname } from 'expo-router'
import React from 'react'
import { Dimensions } from 'react-native'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'

export default function VideoListEmpty() {
  const { width, height } = Dimensions.get('screen')
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const pathName = usePathname()

  return (
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
        <ThemedView
          style={{
            backgroundColor,
          }}
        >
          <MaterialCommunityIcons
            name="youtube-tv"
            style={{ fontWeight: '400' }}
            size={100}
            color={textColor}
          />
        </ThemedView>
        <ThemedText
          style={{ fontWeight: '400' }}
          type="subtitle"
        >
          {pathName === '/favorite' && pathName.length === 10
            ? 'No favorite channel found.'
            : 'No channel found.'}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  )
}
