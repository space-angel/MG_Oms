'use client';

import { useEffect } from 'react';
import styles from '@/styles/common.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.stateContainer}>
      <h2>오류가 발생했습니다</h2>
      <p>{error.message}</p>
      <button 
        onClick={reset}
        className={styles.primaryButton}
      >
        다시 시도
      </button>
    </div>
  );
} 