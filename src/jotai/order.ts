import { atom } from 'jotai';

// 초기값을 빈 문자열로 설정
export const selectedDateAtom = atom<string>('');
export const selectedTimesAtom = atom<string[]>([]);
export const selectedTypesAtom = atom<string[]>([]); 