'use client';

import { useAtom } from 'jotai';
import { searchQueryAtom } from '@/jotai/search';
import { useRef, useEffect } from 'react';
import Orders from '@/components/Orders';
import { SearchIcon } from '@/components/Icons';

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // '/' 키 입력 시 검색창 포커스
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-10">
      <header className="h-[99px] bg-gray-10">
        <div className="flex items-center h-full py-[22px] px-[45px] max-w-[1400px] mx-auto">
          {/* 왼쪽 네비게이션 */}
          <nav className="flex items-center h-[33px] gap-[14px]">
            <button className="flex justify-center items-center px-[14px] py-[1px] h-[33px] min-w-[101px]">
              <span className="font-[Noto Sans KR] font-medium text-[19.67px] leading-[30px] text-[#333D4B]">
                주문관리
              </span>
            </button>
            <button className="flex justify-center items-center px-[14px] py-[1px] h-[33px] min-w-[83px]">
              <span className="font-[Noto Sans KR] font-medium text-[19.67px] leading-[30px] text-[#6B7684]">
                계산기
              </span>
            </button>
            <button className="flex justify-center items-center px-[14px] py-[1px] h-[33px] min-w-[101px]">
              <span className="font-[Noto Sans KR] font-medium text-[19.67px] leading-[30px] text-[#6B7684]">
                고객정보
              </span>
            </button>
          </nav>

          {/* 검색 버튼 */}
          <div className="flex items-center h-[55px] w-[317px] px-[22px] py-[12px] bg-[rgba(2,32,71,0.05)] rounded-[52.71px] gap-[17px] ml-[241px]">
            <SearchIcon width={23} height={23} className="text-[#A5AFB9] flex-shrink-0" />
            
            {/* 검색 입력 영역 */}
            <div className="flex items-center gap-[6px] flex-1">
              <div className="flex items-center justify-center w-[27.74px] h-[27.74px] bg-[rgba(0,23,51,0.02)] border border-[rgba(0,27,55,0.1)] rounded-[5.55px]">
                <span className="font-bold text-[16.65px] leading-6 text-[#8B95A1]">/</span>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="를 눌러 이름을 검색하세요"
                className="w-full bg-transparent outline-none font-regular text-[19.51px] leading-[30px] text-gray-100 placeholder:text-[#8B95A1]"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8">
        <Orders />
      </main>
    </div>
  );
}
