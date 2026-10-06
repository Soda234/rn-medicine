import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1892FA', // 활성 색상
        tabBarInactiveTintColor: '#A0AAB8', // 비활성 색상
        tabBarIconStyle: {
          marginBottom: 3, // 아이콘 아래 여백
        },
        headerShown: false, // 헤더 숨기기
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='pill' size={28} color={color} /> // name : 아이콘 이름, size : 아이콘 크기, color : 아이콘 색상
          ),
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: '스케줄',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='clipboard-list-outline'
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
