'use client';

import { useState, useMemo, useEffect } from 'react';
import { UserIcon, PhoneIcon, PlusCircleIcon, CloseIcon } from '@/components/Icons';
import Small from '@/components/Common/Button/Small';
import AddModal from '@/components/AddModal';
import { createOrder } from '@/lib/firebase/orders';
import { OrderItem, DeliveryType } from '@/app/orders/types/order';
import Toast from '@/components/Toast';
import { useAtom } from 'jotai';
import { selectedDateAtom } from '@/jotai/order';

export default function NewOrder() {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [orderTime, setOrderTime] = useState('');
  const [selectedType, setSelectedType] = useState<DeliveryType>('STORE');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // 시간 옵션 생성 (7시부터 18시까지, 10분 단위)
  const timeOptions = useMemo(() => {
    if (!selectedDate) return [];
    
    const options = [];
    for (let hour = 7; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push({
          label: timeString,
          value: `${selectedDate}T${timeString}`
        });
      }
    }
    return options;
  }, [selectedDate]);

  // 선택된 시간을 보기 좋게 포맷팅
  const formatDisplayTime = (dateTimeString: string) => {
    if (!dateTimeString) return '시간 선택';
    return dateTimeString.split('T')[1].slice(0, 5);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.time-dropdown')) {
        setIsTimeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddMenuItem = (item: OrderItem) => {
    setOrderItems(prev => {
      // 동일한 메뉴가 있는지 확인
      const existingItemIndex = prev.findIndex(
        prevItem => prevItem.menuName === item.menuName
      );

      if (existingItemIndex !== -1) {
        // 동일한 메뉴가 있으면 수량만 증가
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + item.quantity
        };
        return newItems;
      }

      // 동일한 메뉴가 없으면 새로 추가
      return [...prev, item];
    });
  };

  const handleRemoveMenuItem = (index: number) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneNumber || !orderTime || orderItems.length === 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // orderTime은 이미 'YYYY-MM-DDTHH:mm' 형식으로 들어옴
      // 시간 변환 없이 그대로 저장
      const orderData = {
        customerName,
        phoneNumber,
        orderTime, // 선택된 시간을 그대로 저장
        deliveryType: selectedType,
        items: orderItems,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };

      await createOrder(orderData);
      
      // 주문 등록 완료 이벤트 발생
      window.dispatchEvent(new Event('orderCreated'));
      setIsMenuOpen(false);
      setCustomerName('');
      setPhoneNumber('');
      setOrderTime('');
      setSelectedType('STORE');
      setOrderItems([]);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('주문 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[348px] h-screen flex flex-col bg-white py-8">
          {/* 상단 고정 영역 */}
          <div className="flex flex-col items-start px-6 gap-6">
            <h2 className="Title_28_SemiBold text-gray-100">주문 추가하기</h2>
          </div>

          <div className="w-full px-6 py-4">
            <div className="w-full h-[1px] bg-[rgba(0,27,55,0.1)]" />
          </div>

          {/* 예약자 정보 */}
          <div className="flex flex-col gap-8 px-6 w-full">
            <h3 className="Head_20_SemiBold text-gray-80">예약자 정보</h3>
            
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center gap-3 p-[10px_12px] bg-gray-10 rounded-lg">
                <UserIcon width={24} height={24} className="text-[#B3B8BE]" />
                <input 
                  type="text"
                  placeholder="이름"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="Head_20_Medium bg-transparent w-full text-gray-100 placeholder:text-gray-80"
                />
              </div>

              <div className="flex items-center gap-3 p-[10px_12px] bg-gray-10 rounded-lg">
                <PhoneIcon width={24} height={24} className="text-[#B3B8BE]" />
                <input 
                  type="tel"
                  placeholder="연락처"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="Head_20_Medium bg-transparent w-full text-gray-100 placeholder:text-gray-80"
                />
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="w-full px-6 py-4">
            <div className="w-full h-[1px] bg-[rgba(0,27,55,0.1)]" />
          </div>

          {/* 주문 정보 */}
          <div className="flex flex-col gap-8 px-6 w-full">
            <h3 className="Head_20_SemiBold text-gray-80">주문 정보</h3>
            
            <div className="flex flex-col gap-8 w-full">
              <div className="flex items-center justify-between p-[10px_12px] bg-gray-10 rounded-lg">
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setOrderTime('');
                  }}
                  className="Head_20_Medium bg-transparent w-full text-gray-100"
                />
              </div>

              <div className="relative time-dropdown">
                <button
                  type="button"
                  onClick={() => setIsTimeDropdownOpen(prev => !prev)}
                  disabled={!selectedDate}
                  className="flex items-center justify-between w-full p-[10px_12px] bg-gray-10 rounded-lg disabled:opacity-50"
                >
                  <span className="Head_20_Medium text-gray-100">
                    {formatDisplayTime(orderTime)}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isTimeDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-20 max-h-[300px] overflow-y-auto time-dropdown-content">
                    {timeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setOrderTime(option.value);
                          setIsTimeDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-10 Head_20_Medium ${
                          orderTime === option.value 
                            ? 'bg-semantic-main-10 text-semantic-main-100' 
                            : 'text-gray-80'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <Small
                  label="방문 수령"
                  isSelected={selectedType === 'STORE'}
                  onClick={() => setSelectedType('STORE')}
                />
                <Small
                  label="퀵 배송"
                  isSelected={selectedType === 'QUICK'}
                  onClick={() => setSelectedType('QUICK')}
                />
                <Small
                  label="배달"
                  isSelected={selectedType === 'DELIVERY'}
                  onClick={() => setSelectedType('DELIVERY')}
                />
              </div>
            </div>
          </div>

          {/* 메뉴 영역 */}
          <div className="flex-1 flex flex-col">
            {/* 메뉴 추가 버튼 - 고정 */}
            <div className="w-full px-3 py-6 relative bg-white">
              <button 
                className={`flex items-center gap-3 p-[10px_12px] w-full rounded-lg border border-gray-30
                  ${isMenuOpen ? 'bg-[#F2F4F6]' : 'bg-white hover:bg-[#F2F4F6]'}`}
                onClick={() => setIsMenuOpen(true)}
              >
                <div className="w-[30px] h-[30px] rounded-lg bg-semantic-main-10 flex items-center justify-center">
                  <PlusCircleIcon width={30} height={30} />
                </div>
                <span className="Head_20_Medium text-gray-80">메뉴 추가하기</span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-[380px] top-[0vh] translate-y-[-50%]">
                  <AddModal 
                    onClose={() => setIsMenuOpen(false)}
                    onAddItem={handleAddMenuItem}
                  />
                </div>
              )}
            </div>

            {/* 메뉴 목록 - 스크롤 영역 */}
            <div className="h-[280px] overflow-y-auto">
              {orderItems.length > 0 && (
                <div className="px-6">
                  <div className="flex flex-col gap-2">
                    {orderItems.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-[11px_12px] bg-gray-0 rounded-8"
                      >
                        <span className="font-pretendard-jp Head_20_Medium text-gray-100 flex items-center tracking-[-0.0091em]">
                          {item.menuName}
                        </span>
                        <div className="flex justify-between items-center gap-3">
                          <span className="font-pretendard-jp Head_20_Medium text-gray-100 flex items-center tracking-[-0.0091em]">
                            {item.quantity}개
                          </span>
                          <button
                            onClick={() => handleRemoveMenuItem(index)}
                            className="flex items-center w-4 h-4"
                          >
                            <CloseIcon width={16} height={16} className="text-[#D9DBDF]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 주문 등록 버튼 - 하단 고정 */}
          <div className="w-full px-6 pb-6 pt-4">
            <button 
              className="w-full p-4 bg-semantic-main-100 rounded-lg disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <span className="Head_20_SemiBold text-white">
                {isLoading ? '등록 중...' : '주문 등록'}
              </span>
            </button>
          </div>
        </div>
      </div>
      <Toast 
        message="주문이 등록되었습니다" 
        isVisible={showToast} 
      />
    </>
  );
} 