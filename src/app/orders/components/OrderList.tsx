'use client';

import OrderItem from './OrderItem';
import styles from './OrderList.module.css';
import { fetchOrders } from '../actions';

interface OrderListProps {
  timeSlot: string;
}

export default async function OrderList({ timeSlot }: OrderListProps) {
  const orders = await fetchOrders(timeSlot);

  if (!orders?.length) {
    return <div className={styles.emptyState}>주문 내역이 없습니다.</div>;
  }

  return (
    <div className={styles.listContainer}>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
} 