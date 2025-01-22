import { 
  collection, 
  addDoc, 
  updateDoc,
  doc, 
  getDocs,
  query,
  where,
  Timestamp,
  DocumentReference,
  orderBy
} from 'firebase/firestore';
import { db } from './config';
import { Order, OrderStatus, DeliveryType } from '@/types/order';

// 주문 컬렉션 레퍼런스
const ordersRef = collection(db, 'orders');

// 새로운 주문 생성
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
  console.log('createOrder 호출됨:', orderData);
  
  try {
    const ordersRef = collection(db, 'orders');
    const newOrder = {
      ...orderData,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    console.log('생성할 새 주문:', newOrder);
    
    const docRef = await addDoc(ordersRef, newOrder);
    console.log('주문 생성 성공:', docRef.id);
    
    return { id: docRef.id, ...newOrder };
  } catch (error) {
    console.error('주문 생성 중 오류 발생:', error);
    throw error;
  }
};

// 주문 상태 업데이트
export const updateOrderStatus = async (orderId: string, isCompleted: boolean) => {
  console.log('주문 상태 업데이트 시도:', { orderId, isCompleted });
  
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { 
      isCompleted,
      updatedAt: new Date().toISOString()
    });
    console.log('주문 상태 업데이트 성공');
  } catch (error) {
    console.error('주문 상태 업데이트 실패:', error);
    throw error;
  }
};

// 데이터 검증 함수
const validateOrder = (data: any): Order => {
  const order: Order = {
    id: data.id,
    orderTime: data.orderTime,
    customerName: data.customerName,
    phoneNumber: data.phoneNumber,
    items: data.items,
    deliveryType: data.deliveryType,
    status: data.status || OrderStatus.PENDING,
    createdAt: data.createdAt
  };

  return order;
};

// 특정 시간대의 주문 조회
export const getOrdersByTimeSlot = async (timeSlot: string): Promise<Order[]> => {
  console.log('주문 데이터 가져오기 시작:', timeSlot);
  
  try {
    const ordersRef = collection(db, 'orders');
    let q = query(ordersRef);
    
    if (timeSlot !== 'ALL') {
      q = query(ordersRef, where('timeSlot', '==', timeSlot));
    }
    
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        orderTime: data.orderTime,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        items: data.items,
        deliveryType: data.deliveryType,
        status: data.status,
        isCompleted: data.isCompleted || false,
        createdAt: data.createdAt
      } as Order;
    });
    
    console.log('가져온 주문 데이터:', orders);
    return orders;
  } catch (error) {
    console.error('주문 데이터 가져오기 실패:', error);
    throw error;
  }
};

// 주문 삭제
export async function deleteOrder(orderId: string) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { 
      status: OrderStatus.CANCELLED 
    });
  } catch (error) {
    console.error('주문 삭제 중 오류 발생:', error);
    throw new Error('주문을 삭제하는데 실패했습니다.');
  }
}

// 특정 날짜의 주문만 가져오는 함수
export const getOrdersByDate = async (date: string) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('orderTime', '>=', `${date}T00:00:00`),
      where('orderTime', '<=', `${date}T23:59:59`),
      orderBy('orderTime', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error fetching orders by date:', error);
    throw error;
  }
}; 