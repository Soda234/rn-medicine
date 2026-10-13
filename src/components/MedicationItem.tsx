import { PillColor } from '@/types';
import { ReactNode } from 'react';
import { View } from 'react-native';
import Badge from './Badge';
import Pill from './Pill';
import Typography from './Typography';

type MedicationItemProps = {
  name: string;
  memo: string;
  timing: string;
  header?: ReactNode;
  footer?: ReactNode;
  color?: PillColor;
};

const MedicationItem = ({
  name,
  memo,
  color,
  header,
  timing,
  footer,
}: MedicationItemProps) => {
  return (
    <View className='flex flex-col gap-4 px-5 py-6 border border-gray-200 rounded-2xl bg-white'>
      {header}
      <View className='flex-col gap-2'>
        <Pill color={color} />
        <Typography variant='lg'>{name}</Typography>
        <View className='flex-row justify-between'>
          <Typography variant='sm'>{memo}</Typography>
          {timing && <Badge name={timing} />}
        </View>
      </View>

      {footer}
    </View>
  );
};

export default MedicationItem;
