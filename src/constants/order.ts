export const TIME_OPTIONS = [
  { value: 'BEFORE_9', label: '9시 이전' },
  { value: '9', label: '9시' },
  { value: '10', label: '10시' },
  { value: '11', label: '11시' },
  { value: '12', label: '12시' },
  { value: '13', label: '13시' },
  { value: '14', label: '14시' },
  { value: '15', label: '15시' },
  { value: 'AFTER_15', label: '15시 이후' },
] as const;

export const STATUS_COLORS = {
  PENDING: '#FF9500',
  PREPARING: '#007AFF',
  COMPLETED: '#34C759',
  CANCELLED: '#FF3B30',
  DEFAULT: '#8E8E93',
} as const;

export const STATUS_TEXT = {
  PENDING: '접수 대기',
  PREPARING: '준비중',
  COMPLETED: '완료',
  CANCELLED: '취소됨',
  DEFAULT: '알 수 없음',
} as const;

export const DELIVERY_TYPE_TEXT = {
  STORE: '매장수령',
  QUICK: '퀵배송',
  DELIVERY: '배달',
  DEFAULT: '알 수 없음',
} as const; 