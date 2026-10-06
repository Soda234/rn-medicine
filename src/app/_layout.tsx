import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{ headerShown: false /* 헤더 숨기기 */ }}
      />
    </Stack>
  );
}
