export interface Order {
  id: string;
  orderTime: string;
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  deliveryType: DeliveryType;
  status: OrderStatus;
  specialRequests?: string;
}

export interface OrderItem {
  menuName: string;
  quantity: number;
  price: number;
}

export enum DeliveryType {
  STORE = 'STORE',
  QUICK = 'QUICK',
  DELIVERY = 'DELIVERY'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
} 