'use client';

import { useState } from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`; 