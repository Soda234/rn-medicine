import Typography from '@/components/Typography';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Schedule = () => {
  return (
    <SafeAreaView>
      <Text className='text-2xl font-bold'>일정</Text>
      <Typography variant='xxl'>일정</Typography>
    </SafeAreaView>
  );
};

export default Schedule;
