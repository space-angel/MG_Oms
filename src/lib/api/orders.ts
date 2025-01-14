import { Order, OrderStatus } from '@/app/orders/types/order';
import { isValidOrder } from '@/utils/typeGuards';

const BASE_URL = '/api/orders';

export const ordersApi = {
  getOrders: async (timeSlot?: string): Promise<Order[]> => {
    try {
      const response = await fetch(`${BASE_URL}${timeSlot ? `?time=${timeSlot}` : ''}`);
      
      if (!response.ok) {
        throw new Error('주문 데이터를 불러오는데 실패했습니다.');
      }
      
      const data = await response.json();
      const validOrders = data.filter(isValidOrder);
      
      return validOrders;
    } catch (error) {
      console.error('주문 조회 중 오류 발생:', error);
      throw error;
    }
  },

  deleteOrder: async (orderId: string): Promise<void> => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });

      if (!response.ok) {
        throw new Error('주문 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('주문 삭제 중 오류 발생:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<void> => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      });

      if (!response.ok) {
        throw new Error('주문 상태 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('주문 상태 업데이트 중 오류 발생:', error);
      throw error;
    }
  }
}; 