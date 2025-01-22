'use client';

import { useState } from 'react';
import { FileIcon, PlusCircleIcon2, ChatIcon } from '@/components/Icons';
import OrderSummary from './OrderSummary';
import NewOrder from './NewOrder';
import OrderMessages from './OrderMessages';

export default function Navigation() {
  const [activeComponent, setActiveComponent] = useState<string>('orders');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orders':
        return <OrderSummary />;
      case 'new':
        return <NewOrder />;
      case 'messages':
        return <OrderMessages />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-[382px] bg-white flex flex-col">
        {renderComponent()}
      </div>
      <nav className="flex-shrink-0 bg-white border-l-[1.4px] border-[#001B37]/10 flex flex-col items-center gap-6 px-8 py-12">
        <button
          className={`flex flex-col items-center gap-2 w-12 ${
            activeComponent === 'orders' ? 'text-gray-100' : 'text-[#9BA0A8]'
          }`}
          onClick={() => setActiveComponent('orders')}
        >
          <div className={`flex items-center justify-center p-1.5 w-12 h-12 rounded-[10px] ${
            activeComponent === 'orders' ? 'bg-[#DBDDE1]' : ''
          }`}>
            <FileIcon 
              width={24} 
              height={24}
              className="text-current" 
            />
          </div>
          <span className="Head_20_Medium whitespace-nowrap">주문 조회</span>
        </button>
        <button
          className={`flex flex-col items-center gap-2 w-12 ${
            activeComponent === 'new' ? 'text-gray-100' : 'text-[#9BA0A8]'
          }`}
          onClick={() => setActiveComponent('new')}
        >
          <div className={`flex items-center justify-center p-1.5 w-12 h-12 rounded-[10px] ${
            activeComponent === 'new' ? 'bg-[#DBDDE1]' : ''
          }`}>
            <PlusCircleIcon2 
              width={24} 
              height={24}
              className="text-current" 
            />
          </div>
          <span className="Head_20_Medium whitespace-nowrap">새 주문</span>
        </button>
        <button
          className={`flex flex-col items-center gap-2 w-12 ${
            activeComponent === 'messages' ? 'text-gray-100' : 'text-[#9BA0A8]'
          }`}
          onClick={() => setActiveComponent('messages')}
        >
          <div className={`flex items-center justify-center p-1.5 w-12 h-12 rounded-[10px] ${
            activeComponent === 'messages' ? 'bg-[#DBDDE1]' : ''
          }`}>
            <ChatIcon 
              width={24} 
              height={24}
              className="text-current" 
            />
          </div>
          <span className="Head_20_Medium whitespace-nowrap">주문 요약</span>
        </button>
      </nav>
    </div>
  );
}
