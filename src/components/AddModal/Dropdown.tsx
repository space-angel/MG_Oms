import { useState } from 'react';
import { DropdownIcon } from '@/components/Icons';
import DropdownMenu from './DropdownMenu';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  category: string;
}

export default function Dropdown({ value, onChange, placeholder, category }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-[10px_12px] bg-gray-10 rounded-lg"
      >
        <span className={`Head_20_Medium ${value ? 'text-gray-100' : 'text-gray-80'}`}>
          {value || placeholder}
        </span>
        <DropdownIcon width={24} height={24} className="text-[#B3B8BE]" />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        onSelect={(value) => {
          onChange(value);
          setIsOpen(false);
        }}
        selectedValue={value}
        category={category}
      />
    </div>
  );
} 