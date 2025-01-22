export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export type DeliveryType = 'STORE' | 'QUICK' | 'DELIVERY';

export interface OrderItem {
  menuName: string;
  quantity: number;
  price?: number;
}

export interface Order {
  id?: string;
  orderTime: string;
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  deliveryType: DeliveryType;
  status: OrderStatus;
  createdAt: string;
  isCompleted?: boolean;
} 