'use client';

import styled from 'styled-components';

interface OrderFilterProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

const TIME_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: '9', label: '9시' },
  { value: '10', label: '10시' },
  { value: '11', label: '11시' },
  { value: '12', label: '12시' },
  { value: '13', label: '13시' },
  { value: '14', label: '14시' },
  { value: '15', label: '15시' },
];

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

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background-color: ${({ isSelected }) => isSelected ? 'var(--primary-color)' : 'white'};
  color: ${({ isSelected }) => isSelected ? 'white' : 'var(--text-color)'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ isSelected }) => isSelected ? 'var(--primary-color)' : '#f5f5f5'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`; 