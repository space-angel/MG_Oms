import { Order } from '@/types/order';
import { TimeIcon, RefreshIcon, CheckCircleIcon2 } from '@/components/Icons';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { updateOrderStatus } from '@/lib/firebase/orders';

interface OrderItem {
  menuName: string;
  quantity: number;
  price?: number;
}

interface OrderTimeGroupProps {
  timeSlot: string;
  totalOrders: number;
  orders: Order[];
  onRefresh: (updatedOrders?: Order[]) => void;
}

export default function OrderTimeGroup({ timeSlot, totalOrders, orders, onRefresh }: OrderTimeGroupProps) {
  const [completedOrders, setCompletedOrders] = useState<Set<string>>(new Set());

  // 초기 완료된 주문 상태 설정
  useEffect(() => {
    const completed = new Set(
      orders
        .filter(order => order.isCompleted)
        .map(order => order.id!)
    );
    setCompletedOrders(completed);
  }, [orders]);

  useEffect(() => {
    console.log('completedOrders 상태 변경:', Array.from(completedOrders));
  }, [completedOrders]);

  const handleOrderComplete = async (orderId: string, currentState: boolean) => {
    console.log('완료 상태 변경 시도:', { orderId, currentState });
    
    try {
      // Firebase 상태 업데이트
      await updateOrderStatus(orderId, !currentState);
      
      // 로컬 상태 업데이트
      setCompletedOrders(prev => {
        const newSet = new Set(prev);
        if (!currentState) {
          newSet.add(orderId);
        } else {
          newSet.delete(orderId);
        }
        return newSet;
      });
      
      // orders 배열 업데이트 (로컬 상태)
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return { ...order, isCompleted: !currentState };
        }
        return order;
      });
      
      // 부모 컴포넌트에 업데이트된 주문 목록 전달
      if (onRefresh) {
        await onRefresh(updatedOrders);
      }
      
    } catch (error) {
      console.error('주문 완료 상태 업데이트 실패:', error);
    }
  };

  const getDeliveryTypeText = (type: string) => {
    switch (type) {
      case 'STORE':
        return '방문수령';
      case 'QUICK':
        return '퀵배송';
      case 'DELIVERY':
        return '배달';
      default:
        return type;
    }
  };

  // 시간 포맷팅 함수
  const formatTime = (dateTimeString: string) => {
    const time = dateTimeString.split('T')[1]; // T로 구분하여 시간 부분만 가져옴
    return time ? time.substring(0, 5) : ''; // HH:mm 형식으로 반환
  };

  return (
    <div className="bg-gray-0 rounded-16 p-8">
      <div className="flex flex-col gap-0">
        {/* 헤더 */}
        <div className="flex flex-col gap-1">   
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gray-20 rounded-lg flex items-center justify-center">
              <TimeIcon className="text-gray-50" />
            </div>
            <span className="Title_28_SemiBold text-gray-100">{timeSlot} 주문</span>
          </div>
          <div className="flex items-center gap-1 py-4">
            <span className="Body_20_Medium text-gray-80">시간별 주문 · {totalOrders}개</span>
            <button className="ml-1" onClick={() => onRefresh()}>
              <RefreshIcon className="text-gray-50" />
            </button>
          </div>
        </div>

        {/* 주문 컨테이너들 */}
        <div className="flex flex-col gap-3">
          {orders.map((order, index) => {
            const isCompleted = order.isCompleted || completedOrders.has(order.id!);
            
            console.log('주문 렌더링:', { 
              orderId: order.id, 
              isCompleted,
              completedOrders: Array.from(completedOrders)
            });

            return (
              <div 
                key={order.id} 
                className={`flex flex-col gap-3 p-4 rounded-[16px] ${
                  index % 2 === 0 ? 'bg-[#F2F4F6]' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center px-8 py-4 gap-16 w-full">
                  <div className={`flex items-center gap-16 flex-1 ${isCompleted ? 'opacity-50' : ''}`}>
                    {/* 주문 번호 */}
                    <div className="flex justify-center items-center gap-8 w-4 h-8">
                      <span className="Title_28_SemiBold text-semantic-main-100 tracking-[-0.02em]">
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* 주문 정보 */}
                    <div className="flex items-center gap-8 flex-1">
                      <span className="Title_28_Medium text-gray-100 tracking-[-0.02em] whitespace-nowrap">
                        {formatTime(order.orderTime)}
                      </span>
                      <div className="flex-1 flex flex-wrap items-center content-center gap-2 min-w-0">
                        {order.items.map((item: OrderItem, idx: number) => (
                          <div key={idx} className="flex items-center px-[14px] py-3 gap-1 min-w-fit">
                            <span className="Title_28_Medium text-gray-80 tracking-[-0.02em] whitespace-nowrap">
                              {item.menuName} {item.quantity}개
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 우측 버튼 그룹 */}
                  <div className="flex justify-end items-center gap-8 shrink-0">
                    <div className={`flex items-center gap-4 ${isCompleted ? 'opacity-50' : ''}`}>
                      <span className="flex justify-center items-center px-2 py-2 min-w-[68px] h-11 bg-gray-30 rounded-8 Head_20_Medium text-gray-100 tracking-[-0.0091em] text-center">
                        {order.customerName}
                      </span>
                      <span className="flex justify-center items-center px-2 py-2 min-w-[68px] h-11 bg-gray-30 rounded-8 Head_20_Medium text-gray-100 tracking-[-0.0091em] text-center">
                        {getDeliveryTypeText(order.deliveryType)}
                      </span>
                    </div>
                    <button 
                      className="w-11 h-11 rounded-8 flex items-center justify-center"
                      onClick={() => handleOrderComplete(order.id!, isCompleted)}
                    >
                      <CheckCircleIcon2 
                        className={`w-[44px] h-[44px] ${
                          isCompleted ? 'text-semantic-main-100' : 'text-[#D9D9D9]'
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 