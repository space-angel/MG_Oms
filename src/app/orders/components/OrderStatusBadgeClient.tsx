'use client';

import { DeliveryType, OrderStatus } from '../types/order';
import { STATUS_COLORS, STATUS_TEXT, DELIVERY_TYPE_TEXT } from '@/constants/order';
import styles from '@/styles/orders.module.css';

interface OrderStatusBadgeProps {
  type: DeliveryType;
  status: OrderStatus;
}

export default function OrderStatusBadgeClient({ type, status }: OrderStatusBadgeProps) {
  return (
    <div className={styles.badgeContainer}>
      <span className={styles.typeBadge}>
        {DELIVERY_TYPE_TEXT[type] || DELIVERY_TYPE_TEXT.DEFAULT}
      </span>
      <span 
        className={styles.statusBadge}
        style={{ backgroundColor: STATUS_COLORS[status] || STATUS_COLORS.DEFAULT }}
      >
        {STATUS_TEXT[status] || STATUS_TEXT.DEFAULT}
      </span>
    </div>
  );
} 