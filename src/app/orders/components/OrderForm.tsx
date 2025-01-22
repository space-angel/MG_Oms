'use client';

import { useState } from 'react';
import { DeliveryType, OrderItem } from '../types/order';
import { DELIVERY_TYPE_TEXT } from '@/constants/order';
import styles from '@/styles/orders.module.css';

interface OrderFormProps {
  onSubmit: (orderData: {
    customerName: string;
    phoneNumber: string;
    items: OrderItem[];
    deliveryType: DeliveryType;
    specialRequests?: string;
    orderTime: string;
  }) => void;
  onCancel: () => void;
}

export default function OrderForm({ onSubmit, onCancel }: OrderFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{ menuName: '', quantity: 1, price: 0 }]);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(DeliveryType.STORE);
  const [specialRequests, setSpecialRequests] = useState('');

  const handleAddItem = () => {
    setItems([...items, { menuName: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customerName,
      phoneNumber,
      items,
      deliveryType,
      specialRequests,
      orderTime: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.orderForm}>
      <div className={styles.formGroup}>
        <label>고객명</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>연락처</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>배달 유형</label>
        <select
          value={deliveryType}
          onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
          className={styles.input}
        >
          {Object.entries(DELIVERY_TYPE_TEXT).map(([type, text]) => (
            type !== 'DEFAULT' && (
              <option key={type} value={type}>
                {text}
              </option>
            )
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>주문 항목</label>
        {items.map((item, index) => (
          <div key={index} className={styles.itemContainer}>
            <input
              type="text"
              placeholder="메뉴명"
              value={item.menuName}
              onChange={(e) => handleItemChange(index, 'menuName', e.target.value)}
              required
              className={styles.itemInput}
            />
            <input
              type="number"
              placeholder="수량"
              value={item.quantity}
              min="1"
              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
              required
              className={styles.itemInput}
            />
            <input
              type="number"
              placeholder="가격"
              value={item.price}
              min="0"
              onChange={(e) => handleItemChange(index, 'price', parseInt(e.target.value))}
              required
              className={styles.itemInput}
            />
            {items.length > 1 && (
              <button type="button" onClick={() => handleRemoveItem(index)} className={styles.removeButton}>
                삭제
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className={styles.addButton}>
          + 항목 추가
        </button>
      </div>

      <div className={styles.formGroup}>
        <label>요청사항</label>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="특별 요청사항을 입력하세요"
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.primaryButton}>
          주문 등록
        </button>
        <button type="button" onClick={onCancel} className={styles.secondaryButton}>
          취소
        </button>
      </div>
    </form>
  );
} 