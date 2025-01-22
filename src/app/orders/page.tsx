import styles from '@/styles/common.module.css';
import OrderFilter from './components/OrderFilter';
import { fetchOrders } from './actions';
import OrderItem from './components/OrderItem';

interface OrdersPageProps {
  searchParams: { time?: string };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const timeSlot = searchParams.time || 'ALL';
  const orders = await fetchOrders(timeSlot);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>주문 관리</h1>
      </div>
      <OrderFilter />
      <div className={styles.listContainer}>
        {!orders?.length ? (
          <div className={styles.emptyState}>주문 내역이 없습니다.</div>
        ) : (
          orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
} 