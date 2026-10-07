import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.push('/create')}>
        <Text className='text-[#ff0000] text-[30px]'>생성 스크린으로 이동</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
