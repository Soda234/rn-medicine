import { Pressable, PressableProps, Text } from 'react-native';

type CustomButtonProps = PressableProps & {
  label: string;
  size?: 'medium' | 'large';
};

const CustomButton = ({
  label,
  size = 'large',
  ...props
}: CustomButtonProps) => {
  const sizeStyles = {
    large: {
      viewStyle: 'h-14',
      textStyle: 'text-sm font-medium',
    },
    medium: {
      viewStyle: 'h-10 ',
      textStyle: 'text-xs font-medium',
    },
  };

  return (
    <Pressable
      className={`w-full ${sizeStyles[size].viewStyle} bg-blue-500 rounded-xl items-center justify-center active:opacity-80`}
      {...props}
    >
      <Text className={`text-white text-center ${sizeStyles[size].textStyle}`}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
