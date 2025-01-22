'use client';

import { useState } from 'react';
import { UserIcon, PhoneIcon, FileIcon, PlusCircleIcon, CloseIcon } from '@/components/Icons';
import Small from '@/components/Common/Button/Small';
import AddModal from '@/components/AddModal';
import { createOrder } from '@/lib/firebase/orders';
import { OrderItem, DeliveryType } from '@/app/orders/types/order';
import Toast from '@/components/Toast';

export default function NewOrder() {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [selectedType, setSelectedType] = useState<DeliveryType>('STORE');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  const handleSubmit = async () => {
    if (!customerName || !phoneNumber || !orderTime || orderItems.length === 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      await createOrder({
        customerName,
        phoneNumber,
        orderTime,
        deliveryType: selectedType,
        items: orderItems,
      });
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
      console.error(error);
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
              <div className="flex items-center gap-3 p-[10px_12px] bg-gray-10 rounded-lg">
                <FileIcon width={24} height={24} className="text-[#B3B8BE] flex-shrink-0" />
                <input 
                  type="datetime-local"
                  value={orderTime}
                  onChange={(e) => setOrderTime(e.target.value)}
                  className="Head_20_Medium bg-transparent w-full min-w-0 text-gray-100"
                />
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