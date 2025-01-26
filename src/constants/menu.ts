export interface MenuItem {
  name: string;
  price?: number;
}

export interface MenuCategory {
  [key: string]: MenuItem[];
}

export const MENU_DATA: MenuCategory = {
  기본: [
    { name: '망개떡세트 S' },
    { name: '망개떡세트 M' },
    { name: '망개떡세트 L' },
    { name: '굴레세트 S' },
    { name: '굴레세트 M' },
    { name: '굴레세트 L' },
    { name: '망굴세트 S' },
    { name: '망굴세트 M' },
    { name: '망굴세트 L' }
  ],
  특수: [
    { name: '종합세트 M' },
    { name: '종합세트 L' },
    { name: '함지선물세트 S' },
    { name: '함지선물세트 M' },
    { name: '함지선물세트 L' },
    { name: '떡 케이크 S' },
    { name: '떡 케이크 M' },
    { name: '떡 케이크 L' },
    { name: '이바지 떡' }
  ],
  음료: [
    { name: '식혜 500mL' },
    { name: '식혜 1L' },
    { name: '호박식혜 500mL' },
    { name: '호박식혜 1L' }
  ],
  '개별로 추가': [
    { name: '흰망개' },
    { name: '쑥망개' },
    { name: '흰굴레' },
    { name: '쑥굴레' },
    { name: '흰수제' },
    { name: '쑥수제' },
    { name: '사과말이' },
    { name: '오메기' },
    { name: '흑임자' },
    { name: '쑥찰떡' },
    { name: '연잎밥' }
  ]
}; 