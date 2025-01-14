import { 
  collection, 
  addDoc, 
  updateDoc,
  doc, 
  getDocs,
  query,
  where,
  Timestamp,
  DocumentReference 
} from 'firebase/firestore';
import { db } from './config';
import { Order, OrderStatus, DeliveryType } from '@/app/orders/types/order';

// 주문 컬렉션 레퍼런스
const ordersRef = collection(db, 'orders');

// 새로운 주문 생성
export async function createOrder(orderData: Omit<Order, 'id' | 'status'>) {
  try {
    // 기본값 설정과 함께 주문 데이터 생성
    const orderWithDefaults = {
      ...orderData,
      orderTime: Timestamp.fromDate(new Date(orderData.orderTime)),
      status: OrderStatus.PENDING,  // 새 주문은 항상 PENDING으로 시작
    };

    const docRef = await addDoc(ordersRef, orderWithDefaults);
    
    // 저장된 데이터 반환 (Timestamp를 다시 string으로 변환)
    return {
      id: docRef.id,
      ...orderData,
      status: OrderStatus.PENDING
    };
  } catch (error) {
    console.error('주문 생성 중 오류 발생:', error);
    throw new Error('주문을 생성하는데 실패했습니다.');
  }
}

// 주문 상태 업데이트
export async function updateOrderStatus(
  orderId: string, 
  status: OrderStatus
) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
  } catch (error) {
    console.error('주문 상태 업데이트 중 오류 발생:', error);
    throw new Error('주문 상태를 업데이트하는데 실패했습니다.');
  }
}

// 데이터 검증 함수
const validateOrder = (data: any): Order => {
  const order: Order = {
    id: data.id,
    orderTime: data.orderTime.toDate().toISOString(),
    customerName: data.customerName,
    phoneNumber: data.phoneNumber,
    items: data.items,
    deliveryType: data.deliveryType as DeliveryType,
    status: data.status as OrderStatus,
    specialRequests: data.specialRequests
  };
  return order;
};

// 특정 시간대의 주문 조회
export async function getOrdersByTimeSlot(timeSlot?: string) {
  try {
    let q = query(ordersRef);
    
    if (timeSlot && timeSlot !== 'ALL') {
      const startTime = new Date();
      startTime.setHours(parseInt(timeSlot), 0, 0, 0);
      
      const endTime = new Date();
      endTime.setHours(parseInt(timeSlot) + 1, 0, 0, 0);
      
      q = query(
        ordersRef,
        where('orderTime', '>=', Timestamp.fromDate(startTime)),
        where('orderTime', '<', Timestamp.fromDate(endTime))
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    // 데이터 변환 및 검증
    const orders: Order[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return validateOrder({ id: doc.id, ...data });
    });

    return orders;
  } catch (error) {
    console.error('주문 조회 중 오류 발생:', error);
    throw new Error('주문을 조회하는데 실패했습니다.');
  }
}

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