'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { selectedDateAtom } from '@/jotai/order';
import { Order, OrderItem } from '@/types/order';
import { TIME_OPTIONS } from '@/constants/order';
import { getOrdersByDate } from '@/lib/firebase/orders';

interface OrderMessagesProps {}

interface MenuSummary {
  [key: string]: number;
}

interface MenuItems {
  흰피?: number;
  쑥피?: number;
  흰망개?: number;
  쑥망개?: number;
  흰굴레?: number;
  쑥굴레?: number;
  쑥찰떡?: number;
  흑임자?: number;
  사과말이?: number;
  흰수제?: number;
  쑥수제?: number;
  오메기?: number;
}

interface ItemsPerMenuType {
  [key: string]: MenuItems;
}

interface IndividualItemPiType {
  [key: string]: {
    흰피?: number;
    쑥피?: number;
  };
}

interface TotalPiType {
  흰피: number;
  쑥피: number;
}

interface TotalIndividualItemsType {
  흰망개: number;
  쑥망개: number;
  흰굴레: number;
  쑥굴레: number;
  흑임자: number;
  사과말이: number;
  흰수제: number;
  쑥수제: number;
  오메기: number;
}

// 피와 개별떡 계산을 위한 상수 추가
const itemsPerMenu: ItemsPerMenuType = {
  // 기본 세트
  '망개떡세트 S': { 흰피: 5, 쑥피: 5, 흰망개: 5, 쑥망개: 5 },
  '망개떡세트 M': { 흰피: 10, 쑥피: 10, 흰망개: 10, 쑥망개: 10 },
  '망개떡세트 L': { 흰피: 15, 쑥피: 15, 흰망개: 15, 쑥망개: 15 },
  '굴레세트 S': { 흰피: 5, 쑥피: 5, 흰굴레: 5, 쑥굴레: 5 },
  '굴레세트 M': { 흰피: 10, 쑥피: 10, 흰굴레: 10, 쑥굴레: 10 },
  '굴레세트 L': { 흰피: 15, 쑥피: 15, 흰굴레: 15, 쑥굴레: 15 },
  '망굴세트 S': { 흰피: 5, 쑥피: 5, 흰망개: 3, 쑥망개: 2, 흰굴레: 2, 쑥굴레: 3 },
  '망굴세트 M': { 흰피: 10, 쑥피: 10, 흰망개: 5, 쑥망개: 5, 흰굴레: 5, 쑥굴레: 5 },
  '망굴세트 L': { 흰피: 15, 쑥피: 15, 흰망개: 10, 쑥망개: 5, 흰굴레: 5, 쑥굴레: 10 },
  
  // 특수 세트
  '종합세트 M': { 흰피: 12, 쑥피: 6.5, 흰망개: 4, 쑥망개: 4, 흰굴레: 2, 쑥굴레: 1, 쑥찰떡: 1, 흑임자: 1, 사과말이: 1, 흰수제: 1, 오메기: 1 },
  '종합세트 L': { 흰피: 17, 쑥피: 9.5, 흰망개: 5, 쑥망개: 5, 흰굴레: 2, 쑥굴레: 1, 쑥찰떡: 2, 흑임자: 1, 사과말이: 2, 흰수제: 2, 쑥수제: 1, 오메기: 1 },
  '함지선물세트 S': { 흰피: 23, 쑥피: 14.5, 흰망개: 6, 쑥망개: 6, 흰굴레: 5, 쑥굴레: 5, 쑥찰떡: 2, 흑임자: 2, 사과말이: 2, 흰수제: 2, 쑥수제: 1, 오메기: 1 },
  '함지선물세트 M': { 흰피: 30, 쑥피: 19.5, 흰망개: 7, 쑥망개: 7, 흰굴레: 7, 쑥굴레: 7, 쑥찰떡: 3, 흑임자: 3, 사과말이: 3, 흰수제: 2, 쑥수제: 2, 오메기: 1 },
  '함지선물세트 L': { 흰피: 36, 쑥피: 25.5, 흰망개: 7, 쑥망개: 7, 흰굴레: 7, 쑥굴레: 7, 쑥찰떡: 4, 흑임자: 4, 사과말이: 4, 흰수제: 3, 쑥수제: 2, 오메기: 5 },
  
  // 케이크 & 이바지
  '떡 케이크 S': { 흰피: 16, 쑥피: 14, 흰망개: 13, 쑥망개: 7, 흰굴레: 3, 쑥굴레: 7 },
  '떡 케이크 M': { 흰피: 23, 쑥피: 20.5, 흰망개: 19, 쑥망개: 10, 흰굴레: 4, 쑥굴레: 9, 오메기: 1 },
  '떡 케이크 L': { 흰피: 30, 쑥피: 28.5, 흰망개: 22, 쑥망개: 12, 흰굴레: 4, 쑥굴레: 11, 흰수제: 2, 쑥수제: 2, 오메기: 1 },
  '이바지 떡': { 흰피: 61, 쑥피: 56, 흰망개: 28, 쑥망개: 28, 흰굴레: 7, 쑥굴레: 7, 쑥찰떡: 7, 흑임자: 7, 흰수제: 6, 쑥수제: 6, 오메기: 6 }
};

const individualItemPiCount: IndividualItemPiType = {
  '흰망개': { 흰피: 1 },
  '쑥망개': { 쑥피: 1 },
  '흰굴레': { 흰피: 1 },
  '쑥굴레': { 쑥피: 1 },
  '흑임자': { 쑥피: 2 },
  '사과말이': { 흰피: 2 },
  '흰수제': { 흰피: 2 },
  '쑥수제': { 쑥피: 2 },
  '오메기': { 쑥피: 1.5 }
};

export default function OrderMessages() {
  // 초기 상태를 모든 시간대가 선택된 상태로 설정
  const [selectedTimes, setSelectedTimes] = useState<string[]>(
    TIME_OPTIONS.map(option => option.value)
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // OrderSummary의 선택된 날짜 가져오기
  const selectedDate = useAtomValue(selectedDateAtom);

  // 날짜 포맷팅 (예: 2024년 1월 22일 기준)
  const formattedDate = useMemo(() => {
    if (!selectedDate) return '';
    const date = new Date(selectedDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 기준`;
  }, [selectedDate]);

  // 선택된 날짜의 주문 데이터 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      if (!selectedDate) return;
      
      try {
        setIsLoading(true);
        const ordersData = await getOrdersByDate(selectedDate);
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [selectedDate]);

  // 시간 전체 선택/해제 핸들러
  const handleSelectAllTimes = () => {
    if (selectedTimes.length === TIME_OPTIONS.length) {
      setSelectedTimes([]); // 모두 해제
    } else {
      setSelectedTimes(TIME_OPTIONS.map(option => option.value)); // 모두 선택
    }
  };

  // 개별 시간 선택 핸들러
  const handleTimeSelect = (value: string) => {
    setSelectedTimes(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // 선택된 시간대의 메뉴 총합 계산
  const menuSummary = useMemo(() => {
    const summary: MenuSummary = {};
    
    // 선택된 시간대가 없으면 빈 객체 반환
    if (selectedTimes.length === 0) {
      return summary;
    }
    
    orders.forEach((order: Order) => {
      const hour = parseInt(order.orderTime.split('T')[1].split(':')[0]);
      const timeSlot = hour < 9 ? '9-before' : 
                      hour > 15 ? '15-after' : 
                      hour.toString();

      if (selectedTimes.includes(timeSlot)) {
        order.items.forEach((item: OrderItem) => {
          if (summary[item.menuName]) {
            summary[item.menuName] += item.quantity;
          } else {
            summary[item.menuName] = item.quantity;
          }
        });
      }
    });

    return summary;
  }, [orders, selectedTimes]);

  // 메뉴 순서 정의
  const menuOrder = useMemo(() => {
    const orderMap = new Map([
      // 세트류
      ['망개떡세트 S', 1], ['망개떡세트 M', 2], ['망개떡세트 L', 3],
      ['굴레세트 S', 4], ['굴레세트 M', 5], ['굴레세트 L', 6],
      ['망굴세트 S', 7], ['망굴세트 M', 8], ['망굴세트 L', 9],
      // 특수
      ['종합세트 M', 10], ['종합세트 L', 11],
      ['함지선물세트 S', 12], ['함지선물세트 M', 13], ['함지선물세트 L', 14],
      ['떡 케이크 S', 15], ['떡 케이크 M', 16], ['떡 케이크 L', 17],
      ['이바지 떡', 18],
      // 음료
      ['식혜 500mL', 19], ['식혜 1L', 20],
      ['호박식혜 500mL', 21], ['호박식혜 1L', 22],
      // 개별로 추가
      ['흰망개', 23], ['쑥망개', 24], ['흰굴레', 25], ['쑥굴레', 26],
      ['흰수제', 27], ['쑥수제', 28], ['사과말이', 29], ['오메기', 30],
      ['흑임자', 31], ['쑥찰떡', 32], ['연잎밥', 33]
    ]);
    return orderMap;
  }, []);

  // 메뉴 정렬 함수
  const sortedMenuSummary = useMemo(() => {
    return Object.entries(menuSummary)
      .sort(([menuNameA], [menuNameB]) => {
        const orderA = menuOrder.get(menuNameA) ?? 999;
        const orderB = menuOrder.get(menuNameB) ?? 999;
        return orderA - orderB;
      });
  }, [menuSummary, menuOrder]);

  // 피와 개별떡 총합 계산
  const calculateTotalPiAndItems = useMemo(() => {
    const totalPi: TotalPiType = {
      흰피: 0,
      쑥피: 0
    };
    
    const totalIndividualItems: TotalIndividualItemsType = {
      흰망개: 0, 쑥망개: 0, 흰굴레: 0, 쑥굴레: 0,
      흑임자: 0, 사과말이: 0, 흰수제: 0, 쑥수제: 0, 오메기: 0
    };

    // 세트 메뉴에서의 피와 개별떡 계산
    Object.entries(menuSummary).forEach(([menuName, quantity]) => {
      // 세트 메뉴 계산
      if (itemsPerMenu[menuName]) {
        const menuItems = itemsPerMenu[menuName];
        Object.entries(menuItems).forEach(([itemName, count]) => {
          if (itemName === '흰피' || itemName === '쑥피') {
            totalPi[itemName as keyof TotalPiType] += count * quantity;
          } else {
            totalIndividualItems[itemName as keyof TotalIndividualItemsType] += count * quantity;
          }
        });
      }
      // 개별떡 주문 계산
      else if (individualItemPiCount[menuName]) {
        // 개별떡의 피 계산
        Object.entries(individualItemPiCount[menuName]).forEach(([piType, count]) => {
          totalPi[piType as keyof TotalPiType] += count * quantity;
        });
        // 개별떡 개수 계산
        if (Object.keys(totalIndividualItems).includes(menuName)) {
          totalIndividualItems[menuName as keyof TotalIndividualItemsType] += quantity;
        }
      }
    });

    return { totalPi, totalIndividualItems };
  }, [menuSummary]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-center items-center py-8">
          <span className="Body_16_Regular text-gray-60">로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      {/* 상단 타이틀 */}
      <div className="border-b border-gray-20 pb-4 mb-6">
        <h2 className="Title_24_SemiBold text-gray-100">주문 요약</h2>
        <p className="Title_18_Regular text-gray-60">{formattedDate}</p>
      </div>

      {/* 시간대 필터 UI */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="Title_18_SemiBold text-gray-100">요약 시간</h3>
          <button
            onClick={handleSelectAllTimes}
            className="px-3 py-1.5 rounded-lg Body_14_Medium text-gray-60 hover:bg-gray-20"
          >
            {selectedTimes.length === TIME_OPTIONS.length ? '선택 해제' : '모두 선택'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => handleTimeSelect(option.value)}
              className={`px-4 py-2 rounded-lg Body_16_Medium ${
                selectedTimes.includes(option.value)
                  ? 'bg-semantic-main-10 text-semantic-main-100'
                  : 'bg-gray-10 text-gray-60'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 메뉴 총합 표시 */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col divide-y divide-gray-20">
          {sortedMenuSummary.map(([menuName, quantity]) => (
            <div 
              key={menuName}
              className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
            >
              <span className="Title_18_Medium text-gray-100">{menuName}</span>
              <div className="flex items-center gap-2">
                <span className="Body_16_Regular text-gray-80">{quantity}개</span>
              </div>
            </div>
          ))}
        </div>

        {sortedMenuSummary.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <span className="Title_18_Regular text-gray-60">선택된 시간대의 주문이 없습니다.</span>
          </div>
        )}

        {/* 피 계산 섹션 */}
        <div className="mt-8 pt-6 border-t border-gray-20">
          <h3 className="Title_20_SemiBold text-gray-100 mb-4">필요한 피 개수</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="Title_18_Medium text-gray-80">흰피</span>
              <span className="Body_16_Regular text-gray-80">
                {calculateTotalPiAndItems.totalPi.흰피}장
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="Title_18_Medium text-gray-80">쑥피</span>
              <span className="Body_16_Regular text-gray-80">
                {calculateTotalPiAndItems.totalPi.쑥피}장
              </span>
            </div>
          </div>
        </div>

        {/* 개별떡 계산 섹션 */}
        <div className="mt-8 pt-6 border-t border-gray-20">
          <h3 className="Title_20_SemiBold text-gray-100 mb-4">개별떡 개수</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(calculateTotalPiAndItems.totalIndividualItems)
              .filter(([_, count]) => count > 0)
              .map(([itemName, count]) => (
                <div key={itemName} className="flex justify-between items-center">
                  <span className="Title_18_Medium text-gray-80">{itemName}</span>
                  <span className="Body_16_Regular text-gray-80">{count}개</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 