'use client';

import { useOrders } from '../hooks/useOrders';
import OrderItem from './OrderItem';
import { 
  ListContainer, 
  LoadingState, 
  ErrorState, 
  EmptyState 
} from './styles';

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