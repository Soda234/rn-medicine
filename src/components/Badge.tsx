import { View } from 'react-native';
import Typography from './Typography';

type BadgeProps = {
  name: string;
};

const Badge = ({ name }: BadgeProps) => {
  return (
    <View className='px-2 py-1 bg-blue-100 rounded-xl'>
      <Typography variant='sm' className='text-blue-500'>
        {name}
      </Typography>
    </View>
  );
};

export default Badge;
