import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Text, TextProps } from 'react-native';

type TypographyProps = TextProps & {
  children: ReactNode;
  className?: string;
  variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

const Typography = ({
  children,
  className,
  variant = 'md',
  ...props
}: TypographyProps) => {
  const variantClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    xxl: 'text-3xl',
  };
  return (
    <Text
      allowFontScaling={false}
      className={cn('font-extrabold', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
