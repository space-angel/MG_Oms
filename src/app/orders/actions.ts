'use server'

import { getOrdersByTimeSlot } from '@/lib/firebase/orders';

export async function fetchOrders(timeSlot: string) {
  try {
    const orders = await getOrdersByTimeSlot(timeSlot);
    return orders;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw new Error('주문 목록을 불러오는데 실패했습니다.');
  }
} 