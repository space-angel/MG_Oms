import { Order, OrderItem } from '@/app/orders/types/order';

export const isValidOrderItem = (item: unknown): item is OrderItem => {
  const i = item as any;
  return (
    typeof i === 'object' &&
    i !== null &&
    typeof i.menuName === 'string' &&
    typeof i.quantity === 'number' &&
    typeof i.price === 'number'
  );
};

export const isValidOrder = (order: unknown): order is Order => {
  const o = order as any;
  return (
    typeof o === 'object' &&
    o !== null &&
    typeof o.id === 'string' &&
    typeof o.orderTime === 'string' &&
    typeof o.customerName === 'string' &&
    typeof o.phoneNumber === 'string' &&
    Array.isArray(o.items) &&
    o.items.every(isValidOrderItem) &&
    typeof o.deliveryType === 'string' &&
    typeof o.status === 'string'
  );
}; 