import styled from 'styled-components';
import { StateContainer } from '@/styles/common';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ItemContainer = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const LoadingState = styled(StateContainer)`
  color: var(--primary-color);
`;

export const ErrorState = styled(StateContainer)`
  color: #FF3B30;
`;

export const EmptyState = styled(StateContainer)`
  color: #8E8E93;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ isSelected: boolean }>`
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

export const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

export const TypeBadge = styled(Badge)`
  background-color: #E5E5EA;
  color: #8E8E93;
`;

export const StatusBadge = styled(Badge)<{ color: string }>`
  background-color: ${({ color }) => color};
  color: white;
`; 