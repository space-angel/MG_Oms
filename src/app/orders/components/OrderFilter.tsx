'use client';

import { TIME_OPTIONS } from '@/constants/order';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '@/styles/orders.module.css';

export default function OrderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTime = searchParams.get('time') || 'ALL';

  const handleTimeChange = (time: string) => {
    router.push(`/orders?time=${time}`);
  };

  return (
    <div className={styles.filterContainer}>
      {TIME_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={styles.filterButton}
          data-selected={selectedTime === option.value}
          onClick={() => handleTimeChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
} 