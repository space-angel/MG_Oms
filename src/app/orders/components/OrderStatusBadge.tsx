'use client';

import styled from 'styled-components';
import { DeliveryType, OrderStatus } from '../types/order';

interface OrderStatusBadgeProps {
  type: DeliveryType;
  status: OrderStatus;
}

export default function OrderStatusBadge({ type, status }: OrderStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return '#FF9500';
      case OrderStatus.PREPARING:
        return '#007AFF';
      case OrderStatus.COMPLETED:
        return '#34C759';
      case OrderStatus.CANCELLED:
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return '접수 대기';
      case OrderStatus.PREPARING:
        return '준비중';
      case OrderStatus.COMPLETED:
        return '완료';
      case OrderStatus.CANCELLED:
        return '취소됨';
      default:
        return '알 수 없음';
    }
  };

  const getDeliveryTypeText = () => {
    switch (type) {
      case DeliveryType.STORE:
        return '매장수령';
      case DeliveryType.QUICK:
        return '퀵배송';
      case DeliveryType.DELIVERY:
        return '배달';
      default:
        return '알 수 없음';
    }
  };

  return (
    <BadgeContainer>
      <TypeBadge>{getDeliveryTypeText()}</TypeBadge>
      <StatusBadge color={getStatusColor()}>
        {getStatusText()}
      </StatusBadge>
    </BadgeContainer>
  );
}

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

const TypeBadge = styled(Badge)`
  background-color: #F2F2F7;
  color: #666;
`;

const StatusBadge = styled(Badge)<{ color: string }>`
  background-color: ${({ color }) => `${color}15`};
  color: ${({ color }) => color};
`; 