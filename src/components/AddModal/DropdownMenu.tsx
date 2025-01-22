import { MENU_DATA } from '@/constants/menu';

interface DropdownMenuProps {
  isOpen: boolean;
  onSelect: (value: string) => void;
  selectedValue: string;
  category: string;
}

export default function DropdownMenu({ 
  isOpen, 
  onSelect, 
  selectedValue,
  category 
}: DropdownMenuProps) {
  if (!isOpen) return null;

  const menuItems = MENU_DATA[category] || [];

  return (
    <div className="absolute top-full left-0 w-[252px] max-h-[320px] flex flex-col items-start p-2 bg-white shadow-custom rounded-[0px] mt-2 overflow-y-auto">
      <div className="w-full">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelect(item.name)}
            className="flex items-center w-full px-3 py-[10px] hover:bg-gray-10 rounded-lg"
          >
            <span className={`Body_16_Medium ${
              item.name === selectedValue 
                ? 'text-semantic-main-100' 
                : 'text-gray-80 hover:text-semantic-main-100'
            }`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 