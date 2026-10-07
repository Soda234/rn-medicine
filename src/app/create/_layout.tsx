import { Feather } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable } from 'react-native';

const CreateLayout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
      <Stack.Screen
        name='index'
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name='chevron-left' size={28} color='black' />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='date'
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name='chevron-left' size={28} color='black' />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default CreateLayout;
