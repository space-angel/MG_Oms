'use client';

import { useState } from 'react';
import { CloseIcon, DropdownIcon, MinusIcon, PlusIcon } from '@/components/Icons';
import Dropdown from './Dropdown';
import { OrderItem } from '@/app/orders/types/order';
import { MENU_DATA } from '@/constants/menu';

interface AddModalProps {
  onClose: () => void;
  onAddItem: (item: OrderItem) => void;
}

export default function AddModal({ onClose, onAddItem }: AddModalProps) {
  const [selectedTab, setSelectedTab] = useState<string>('기본');
  const [menuName, setMenuName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const tabs = ['기본', '특수', '음료', '개별로 추가'];

  const handleAddItem = () => {
    if (!menuName) {
      alert('메뉴를 선택해주세요.');
      return;
    }

    const selectedMenu = MENU_DATA[selectedTab].find(item => item.name === menuName);
    if (!selectedMenu) return;

    onAddItem({
      menuName,
      quantity,
      price: 0
    });
    
    // 모달을 닫지 않고, 입력값만 초기화
    setMenuName('');
    setQuantity(1);
  };

  return (
    <div className="w-[398px] flex flex-col items-start p-[32px_24px] gap-6 bg-white rounded-[20px] shadow-custom">
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full">
        <h2 className="Head_20_SemiBold text-gray-80">메뉴 등록하기</h2>
        <button onClick={onClose}>
          <CloseIcon width={20} height={20} className="text-[#B4B6BB]" />
        </button>
      </div>

      {/* 탭 버튼 그룹 */}
      <div className="flex justify-between items-start w-full border-b-2 border-gray-20">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex justify-center items-center px-4 py-[8px_16px_12px] h-12 relative
              ${selectedTab === tab 
                ? 'text-semantic-main-100' 
                : 'text-gray-60'
              }`}
            onClick={() => setSelectedTab(tab)}
          >
            <span className="Head_20_Medium">{tab}</span>
            {selectedTab === tab && (
              <div className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-semantic-main-100" />
            )}
          </button>
        ))}
      </div>

      {/* 메뉴 선택 영역 */}
      <div className="flex flex-col gap-6 w-full">
        {/* 메뉴 선택 */}
        <div className="flex justify-between items-center w-full">
          <span className="Head_20_Medium w-[138px] text-gray-80/70" >메뉴 선택</span>
          <Dropdown 
            value={menuName}
            onChange={setMenuName}
            placeholder="메뉴를 선택해주세요"
            category={selectedTab}
          />
        </div>

        {/* 수량 선택 */}
        <div className="flex justify-between items-center w-full">
          <span className="Head_20_Medium text-gray-80/70">수량</span>
          <div className="flex justify-between items-center p-[10px_12px] w-[252px] h-[48px] bg-[#F2F4F6] rounded-lg gap-3">
            <span className="Head_20_Medium text-gray-60 tracking-[-0.0091em]">{quantity}개</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="text-[#B7BAC0]"
              >
                <MinusIcon className="text-[#B7BAC0]" />
              </button>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="text-[#B7BAC0]"
              >
                <PlusIcon className="text-[#B7BAC0]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 등록 버튼 */}
      <button 
        className="w-full p-4 bg-semantic-main-10 rounded-lg"
        onClick={handleAddItem}
      >
        <span className="Head_20_SemiBold text-semantic-main-100">등록하기</span>
      </button>
    </div>
  );
} 