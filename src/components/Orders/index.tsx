'use client';

import { useState, useCallback, useEffect } from 'react';
import { Order } from '@/types/order';
import { getOrdersByTimeSlot, getOrdersByDate } from '@/lib/firebase/orders';
import OrderTimeGroup from '../OrderTimeGroup';
import { useAtomValue, useAtom } from 'jotai';
import { selectedDateAtom, selectedTimesAtom, selectedTypesAtom } from '@/jotai/order';
import { searchQueryAtom } from '@/jotai/search';


export default function Orders() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const selectedTimes = useAtomValue(selectedTimesAtom);
  const selectedTypes = useAtomValue(selectedTypesAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  const fetchOrders = useCallback(async () => {
    if (!selectedDate) return; // 날짜가 없으면 fetch하지 않음
    
    try {
      setIsLoading(true);
      const fetchedOrders = await getOrdersByDate(selectedDate);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  // 필터 적용
  useEffect(() => {
    let filtered = [...orders];

    console.log('Filtering with:', { selectedDate, selectedTimes, selectedTypes });

    // 검색어 필터
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 날짜 필터
    if (selectedDate) {
      filtered = filtered.filter(order => {
        const orderDate = order.orderTime.split('T')[0];
        return orderDate === selectedDate;
      });
    }

    // 시간 필터
    if (selectedTimes.length > 0) {
      filtered = filtered.filter(order => {
        const hour = parseInt(order.orderTime.split('T')[1].split(':')[0]);
        
        return selectedTimes.some(selectedTime => {
          if (selectedTime === '9-before') return hour < 9;
          if (selectedTime === '15-after') return hour > 15;
          return hour === parseInt(selectedTime);
        });
      });
    }

    // 수령 방법 필터
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(order => 
        selectedTypes.includes(order.deliveryType)
      );
    }

    console.log('Filtered orders:', filtered);
    setFilteredOrders(filtered);
  }, [orders, selectedDate, selectedTimes, selectedTypes, searchQuery]);

  // 초기 데이터 로딩
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 시간대별로 주문 그룹화
  const groupedOrders = filteredOrders.reduce((groups, order) => {
    const hour = parseInt(order.orderTime.split('T')[1].split(':')[0]);
    const timeSlot = formatTimeSlot(hour);
    if (!groups[timeSlot]) groups[timeSlot] = [];
    groups[timeSlot].push(order);
    return groups;
  }, {} as Record<string, Order[]>);

  // 시간대 순서 정렬
  const sortedTimeSlots = Object.entries(groupedOrders).sort((a, b) => {
    const timeOrder = [
      '9시 이전',
      '9시',
      '10시',
      '11시',
      '12시',
      '13시',
      '14시',
      '15시',
      '15시 이후'
    ];
    return timeOrder.indexOf(a[0]) - timeOrder.indexOf(b[0]);
  });

  return (
    <div className="flex h-screen overflow-hidden">

      {/* 오른쪽 주문 목록 영역 */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex flex-col gap-12">
          {sortedTimeSlots.map(([timeSlot, orders]) => (
            <OrderTimeGroup
              key={timeSlot}
              timeSlot={timeSlot}
              totalOrders={orders.length}
              orders={orders}
              onRefresh={fetchOrders}
            />
          ))}
          {/* 스크롤을 위한 더미 박스 */}
          <div className="h-24 w-full" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
}

function formatTimeSlot(hour: number): string {
  if (hour < 9) return '9시 이전';
  if (hour > 15) return '15시 이후';
  return `${hour}시`;
} 