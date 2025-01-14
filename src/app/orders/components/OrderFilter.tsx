'use client';

import { TIME_OPTIONS } from '@/constants/order';
import { FilterContainer, FilterButton } from './styles';

interface OrderFilterProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

export default function OrderFilter({ selectedTime, onTimeChange }: OrderFilterProps) {
  return (
    <FilterContainer>
      {TIME_OPTIONS.map((option) => (
        <FilterButton
          key={option.value}
          isSelected={selectedTime === option.value}
          onClick={() => onTimeChange(option.value)}
          type="button"
        >
          {option.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
} 