import CustomButton from '@/components/CustomButton';
import MedicationItem from '@/components/MedicationItem';
import Typography from '@/components/Typography';
import { SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  {
    title: '08:00',
    data: [
      {
        id: 1,
        name: '비타민',
        memo: '메모',
        timing: '식후 30분',
        color: 'RED',
      },
      {
        id: 2,
        name: '민트',
        memo: '메모',
        timing: '식후 30분',
        color: 'RED',
      },

      {
        id: 3,
        name: '아연',
        memo: '메모',
        timing: '식후 30분',
        color: 'RED',
      },
    ],
  },
  {
    title: '09:00',
    data: [
      {
        id: 4,
        name: '비타민',
        memo: '메모',
        timing: '식후 30분',
        color: 'RED',
      },
      {
        id: 5,
        name: '민트',
        memo: '메모',
        timing: '식후 30분',
        color: 'RED',
      },
      {
        id: 6,
        name: '아연',
        memo: '메모',
        timing: '식후 30분',
        color: 'RED',
      },
    ],
  },
];

const Home = () => {
  return (
    <SafeAreaView edges={['top']} className='flex flex-1 px-4  bg-white'>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MedicationItem
            name={item.name}
            memo={item.memo}
            timing={item.timing}
            footer={<CustomButton label='추가' />}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Typography>{title}</Typography>
        )}
        contentContainerClassName='p-5 gap-4'
      />
    </SafeAreaView>
  );
};

export default Home;
