'use client';

import { formatTime } from '@/utils/date';
import { Order } from '../types/order';
import OrderStatusBadgeClient from './OrderStatusBadgeClient';
import styles from '@/styles/orders.module.css';

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <div className={styles.orderItem}>
      <div className={styles.orderHeader}>
        <span className={styles.timeInfo}>{formatTime(order.orderTime)}</span>
        <OrderStatusBadgeClient type={order.deliveryType} status={order.status} />
      </div>
      <div className={styles.customerInfo}>
        <span>{order.customerName}</span>
        <span>{order.phoneNumber}</span>
      </div>
      <div className={styles.itemList}>
        {order.items.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <span className={styles.menuName}>{item.menuName}</span>
            <span className={styles.quantity}>{item.quantity}개</span>
            <span className={styles.price}>{item.price.toLocaleString()}원</span>
          </div>
        ))}
      </div>
      {order.specialRequests && (
        <div className={styles.specialRequests}>
          요청사항: {order.specialRequests}
        </div>
      )}
    </div>
  );
} 