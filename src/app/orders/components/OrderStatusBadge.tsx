'use client';

import { DeliveryType, OrderStatus } from '../types/order';
import { STATUS_COLORS, STATUS_TEXT, DELIVERY_TYPE_TEXT } from '@/constants/order';
import { BadgeContainer, TypeBadge, StatusBadge } from './styles';

interface OrderStatusBadgeProps {
  type: DeliveryType;
  status: OrderStatus;
}

export default function OrderStatusBadge({ type, status }: OrderStatusBadgeProps) {
  const statusColor = STATUS_COLORS[status] || STATUS_COLORS.DEFAULT;
  const statusText = STATUS_TEXT[status] || STATUS_TEXT.DEFAULT;
  const deliveryTypeText = DELIVERY_TYPE_TEXT[type] || DELIVERY_TYPE_TEXT.DEFAULT;

  return (
    <BadgeContainer>
      <TypeBadge>{deliveryTypeText}</TypeBadge>
      <StatusBadge color={statusColor}>
        {statusText}
      </StatusBadge>
    </BadgeContainer>
  );
} 