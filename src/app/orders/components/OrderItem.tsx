'use client';

import styled from 'styled-components';
import OrderStatusBadge from './OrderStatusBadge';
import { Order, OrderItem as OrderItemType } from '../types/order';

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // 총 주문 수량 계산
  const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ItemContainer>
      <Header>
        <TimeInfo>{formatTime(order.orderTime)}</TimeInfo>
        <OrderStatusBadge type={order.deliveryType} status={order.status} />
      </Header>
      <CustomerInfo>
        <span>{order.customerName}</span>
        <span>{order.phoneNumber}</span>
      </CustomerInfo>
      <ItemList>
        {order.items.map((item, index) => (
          <MenuItem key={index}>
            <MenuName>{item.menuName}</MenuName>
            <Quantity>{item.quantity}개</Quantity>
            <Price>{item.price.toLocaleString()}원</Price>
          </MenuItem>
        ))}
      </ItemList>
      {order.specialRequests && (
        <SpecialRequests>
          요청사항: {order.specialRequests}
        </SpecialRequests>
      )}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: white;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TimeInfo = styled.div`
  font-size: 14px;
  color: #666;
`;

const CustomerInfo = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
`;

const MenuName = styled.span`
  flex: 1;
  font-weight: 500;
`;

const Quantity = styled.span`
  color: #666;
`;

const Price = styled.span`
  font-weight: 500;
  color: var(--primary-color);
`;

const SpecialRequests = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
  font-size: 14px;
  color: #666;
`; 