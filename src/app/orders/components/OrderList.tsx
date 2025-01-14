'use client';

import styled from 'styled-components';
import OrderItem from './OrderItem';
import { useOrders } from '../hooks/useOrders';

interface OrderListProps {
  timeSlot: string;
}

export default function OrderList({ timeSlot }: OrderListProps) {
  const { orders, isLoading, error } = useOrders(timeSlot);

  if (isLoading) return <LoadingState>로딩 중...</LoadingState>;
  if (error) return <ErrorState>에러가 발생했습니다.</ErrorState>;
  if (!orders?.length) return <EmptyState>주문 내역이 없습니다.</EmptyState>;

  return (
    <ListContainer>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StateContainer = styled.div`
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LoadingState = styled(StateContainer)`
  color: var(--primary-color);
`;

const ErrorState = styled(StateContainer)`
  color: #FF3B30;
`;

const EmptyState = styled(StateContainer)`
  color: #8E8E93;
`; 