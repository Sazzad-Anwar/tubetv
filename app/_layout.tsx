import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Platform } from 'react-native'
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message'
import { useThemeColor } from '../hooks/useThemeColor'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const borderColor = useThemeColor({}, 'border')
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const toastCommonStyle = {
    width: '100%',
    borderLeftWidth: 7,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    borderRightWidth: 1,
    borderRightColor: borderColor,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    backgroundColor,
  } as const

  const textCommonStyle = {
    fontWeight: '400',
    color: textColor,
  } as const

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          ...toastCommonStyle,
          borderLeftColor: '#109300',
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          ...textCommonStyle,
          fontSize: 17,
        }}
        text2Style={{
          ...textCommonStyle,
          fontSize: 15,
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          ...toastCommonStyle,
          borderLeftColor: '#e50000',
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          ...textCommonStyle,
          fontSize: 17,
        }}
        text2Style={{
          ...textCommonStyle,
          fontSize: 15,
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.

      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast
        bottomOffset={Platform.OS === 'android' ? 50 : 80}
        position="bottom"
        visibilityTime={2000}
        config={toastConfig}
      />
    </ThemeProvider>
  )
}
