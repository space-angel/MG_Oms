export type DeliveryType = 'STORE' | 'QUICK' | 'DELIVERY';

export interface OrderItem {
  menuName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  customerName: string;
  phoneNumber: string;
  orderTime: string;
  deliveryType: DeliveryType;
  items: OrderItem[];
  createdAt: string;
  status: OrderStatus;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
} 