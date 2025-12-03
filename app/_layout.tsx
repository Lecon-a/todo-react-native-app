import { ThemeProvider } from '@/hooks/useTheme'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </ThemeProvider>
  )
}

export default _layout