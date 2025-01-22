export interface OrderItem {
  menuName: string;
  quantity: number;
}

export interface Order {
  id?: string;
  customerName: string;
  phoneNumber: string;
  orderTime: string;
  deliveryType: 'STORE' | 'QUICK' | 'DELIVERY';
  items: OrderItem[];
  createdAt: string;
} 