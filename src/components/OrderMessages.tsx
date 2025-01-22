'use client';

import styles from '@/styles/orderMessages.module.css';

export default function OrderMessages() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>주문 요약</h2>
      <div className={styles.messageList}>
        <div className={styles.messageItem}>
          <span className={styles.time}>13:30</span>
          <p className={styles.message}>
            새로운 주문이 등록되었습니다. (송호윤)
          </p>
        </div>
        <div className={styles.messageItem}>
          <span className={styles.time}>13:25</span>
          <p className={styles.message}>
            배달 주문 완료 처리되었습니다. (김민수)
          </p>
        </div>
        <div className={styles.messageItem}>
          <span className={styles.time}>13:20</span>
          <p className={styles.message}>
            퀵배송 주문이 접수되었습니다. (이지원)
          </p>
        </div>
      </div>
    </div>
  );
} 