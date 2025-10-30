import { View } from 'react-native';
import { Text, ChoiceButton } from '@/components/bases';

type FilterOption = {
  value: string;
  label: string;
};

type FilterSectionProps = {
  title: string;
  options: readonly FilterOption[];
  selectedValues: string[];
  onValueChange: (value: string) => void;
};

export const FilterSection = ({
  title,
  options,
  selectedValues,
  onValueChange
}: FilterSectionProps) => {
  return (
    <View className='mb-10'>
      <Text className='mb-3 ml-1 text-l font-bold text-body'>{title}</Text>
      <View className='flex-row flex-wrap gap-2'>
        {options.map((option) => (
          <ChoiceButton
            key={option.value}
            isChecked={selectedValues.includes(option.value)}
            onValueChange={() => onValueChange(option.value)}
            text={option.label}
          />
        ))}
      </View>
    </View>
  );
};
