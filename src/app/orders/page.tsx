'use client';

import { useState, useEffect } from 'react';
import { Order } from './types/order';
import { TIME_OPTIONS } from '@/constants/order';
import styles from '@/styles/orders.module.css';

export default function OrdersPage() {
  const [selectedTime, setSelectedTime] = useState<string>('ALL');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?time=${selectedTime}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [selectedTime]);

  return (
    <div className="flex flex-col h-screen bg-gray-10 p-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="Title_28_SemiBold text-gray-100">주문 관리</h1>
      </div>

      {/* 시간 필터 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedTime('ALL')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedTime === 'ALL'
              ? 'bg-semantic-main-100 text-white'
              : 'bg-white text-gray-80'
          }`}
        >
          전체
        </button>
        {TIME_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedTime(option.value)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedTime === option.value
                ? 'bg-semantic-main-100 text-white'
                : 'bg-white text-gray-80'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* 주문 목록 */}
      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-40 bg-white rounded-lg">
            <p className="text-gray-60">주문 내역이 없습니다.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="Title_24_Medium text-gray-100">
                    {order.customerName}
                  </span>
                  <span className="Body_16_Regular text-gray-60">
                    {order.phoneNumber}
                  </span>
                </div>
                <span className="Body_16_Regular text-gray-60">
                  {order.orderTime}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-20 last:border-0"
                  >
                    <span className="Body_16_Medium text-gray-80">
                      {item.menuName}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="Body_16_Regular text-gray-60">
                        {item.quantity}개
                      </span>
                      <span className="Body_16_Regular text-gray-80">
                        {item.price?.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-md bg-gray-10 text-gray-80 text-sm">
                    {order.deliveryType}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-sm ${
                    order.status === 'PENDING' ? 'bg-[#FFF4E5] text-[#FF9500]' :
                    order.status === 'PREPARING' ? 'bg-[#E5F6FF] text-[#007AFF]' :
                    order.status === 'COMPLETED' ? 'bg-[#E5FFF0] text-[#34C759]' :
                    'bg-gray-10 text-gray-60'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 