'use client';

import { useState, useEffect } from 'react';
import { Order } from '../types/order';

export function useOrders(timeSlot?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/orders${timeSlot ? `?time=${timeSlot}` : ''}`);
        
        if (!response.ok) {
          throw new Error('주문 데이터를 불러오는데 실패했습니다.');
        }
        
        const data = await response.json();
        
        // 타입 안전성을 위해 데이터 검증
        const validateOrder = (order: unknown): order is Order => {
          const o = order as any;
          return (
            typeof o === 'object' &&
            o !== null &&
            typeof o.id === 'string' &&
            typeof o.orderTime === 'string' &&
            typeof o.customerName === 'string' &&
            typeof o.phoneNumber === 'string' &&
            Array.isArray(o.items) &&
            typeof o.deliveryType === 'string' &&
            typeof o.status === 'string'
          );
        };

        // 데이터 필터링 및 검증
        const filteredOrders = (timeSlot && timeSlot !== 'ALL'
          ? data.filter((order: unknown) => {
              if (!validateOrder(order)) return false;
              const orderHour = new Date(order.orderTime).getHours();
              return orderHour === parseInt(timeSlot);
            })
          : data.filter(validateOrder)) as Order[];

        setOrders(filteredOrders);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('알 수 없는 에러가 발생했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [timeSlot]);

  return {
    orders,
    isLoading,
    error,
  };
} 