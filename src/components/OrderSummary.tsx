'use client';

import { useAtom, useSetAtom } from 'jotai';
import { selectedDateAtom, selectedTimesAtom, selectedTypesAtom } from '@/jotai/order';
import { TIME_OPTIONS } from '@/constants/order';
import Small from '@/components/Common/Button/Small';
import { useState } from 'react';

export default function OrderSummary() {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(
    TIME_OPTIONS.map(option => option.value)
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['STORE', 'QUICK', 'DELIVERY']);

  const setSelectedDateAtom = useSetAtom(selectedDateAtom);

  // 주문 시간 전체 선택 핸들러
  const handleSelectAllTimes = () => {
    if (selectedTimes.length === TIME_OPTIONS.length) {
      setSelectedTimes([]);
    } else {
      setSelectedTimes(TIME_OPTIONS.map(option => option.value));
    }
  };

  // 시간 선택 핸들러
  const handleTimeSelect = (value: string) => {
    setSelectedTimes(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // 수령 방법 전체 선택 핸들러
  const handleSelectAllTypes = () => {
    const allTypes = ['STORE', 'QUICK', 'DELIVERY'];
    if (selectedTypes.length === allTypes.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(allTypes);
    }
  };

  // 수령 방법 선택 핸들러
  const handleTypeSelect = (value: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // 모든 시간이 선택되었는지 확인
  const isAllTimesSelected = selectedTimes.length === TIME_OPTIONS.length;
  
  // 모든 수령 방법이 선택되었는지 확인
  const isAllTypesSelected = selectedTypes.length === 3;

  return (
    <div className="flex flex-col gap-4 items-start px-6 pt-8 pb-8 w-full bg-white">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center">
          <h2 className="Title_28_SemiBold text-gray-100">조회 날짜</h2>
        </div>
    
        <div className="flex justify-between items-center p-[10px_12px] w-full h-12 bg-gray-10 rounded-8">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            className="Head_20_Medium text-gray-100 bg-transparent w-full"
          />
        </div>
      </div>

      <div className="w-full h-[1px] my-4 bg-[rgba(0,27,55,0.1)]" />

      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center">
          <h3 className="Head_20_SemiBold text-gray-80">주문 시간</h3>
          <button 
            className={`Body_16_Medium text-center ${
              isAllTimesSelected ? 'text-semantic-main-100' : 'text-gray-80 hover:text-gray-100'
            }`}
            onClick={handleSelectAllTimes}
          >
            모두 선택
          </button>
        </div>

        <div className="flex flex-wrap gap-y-2 gap-x-4">
          {TIME_OPTIONS.map((option) => (
            <Small
              key={option.value}
              label={option.label}
              isSelected={selectedTimes.includes(option.value)}
              onClick={() => handleTimeSelect(option.value)}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] my-4 bg-[rgba(0,27,55,0.1)]" />

      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center">
          <h3 className="Head_20_SemiBold text-gray-80">수령 방법</h3>
          <button 
            className={`Body_16_Medium text-center ${
              isAllTypesSelected ? 'text-semantic-main-100' : 'text-gray-80 hover:text-gray-100'
            }`}
            onClick={handleSelectAllTypes}
          >
            모두 선택
          </button>
        </div>

        <div className="flex flex-wrap gap-y-2 gap-x-4">
          <Small
            label="방문 수령"
            isSelected={selectedTypes.includes('STORE')}
            onClick={() => handleTypeSelect('STORE')}
          />
          <Small
            label="퀵 배송"
            isSelected={selectedTypes.includes('QUICK')}
            onClick={() => handleTypeSelect('QUICK')}
          />
          <Small
            label="배달"
            isSelected={selectedTypes.includes('DELIVERY')}
            onClick={() => handleTypeSelect('DELIVERY')}
          />
        </div>
      </div>
    </div>
  );
} 