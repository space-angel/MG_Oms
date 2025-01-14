'use client';

import { useState } from 'react';
import { Container, Header, Title } from '@/styles/common';
import OrderList from './components/OrderList';
import OrderFilter from './components/OrderFilter';

export default function OrdersPage() {
  const [selectedTime, setSelectedTime] = useState<string>('ALL');
  
  return (
    <Container>
      <Header>
        <Title>주문 조회</Title>
        <OrderFilter 
          selectedTime={selectedTime} 
          onTimeChange={setSelectedTime} 
        />
      </Header>
      <OrderList timeSlot={selectedTime} />
    </Container>
  );
} 