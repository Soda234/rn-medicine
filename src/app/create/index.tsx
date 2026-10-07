import { router } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Create = () => {
  return (
    <SafeAreaView>
      <Text onPress={() => router.push('/create/date')}>정보 입력</Text>
    </SafeAreaView>
  );
};

export default Create;
