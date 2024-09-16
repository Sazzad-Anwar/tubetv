import { Stack } from 'expo-router'
import React from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemedText } from '../ThemedText'
import { ThemedView } from '../ThemedView'

export default function EmptySearch() {
  const { height, width } = Dimensions.get('window')
  const backgroundColor = useThemeColor({}, 'background')
  return (
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
  )
}
