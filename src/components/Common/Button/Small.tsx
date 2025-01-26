'use client';

interface SmallButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Small({
  label,
  isSelected = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: SmallButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        justify-center
        items-center
        px-3
        py-2
        Head_20_Medium
        text-center
        tracking-[-0.0091em]
        rounded-8
        transition-all
        whitespace-nowrap
        ${isSelected 
          ? 'bg-semantic-main-10 text-semantic-main-100' 
          : 'bg-gray-10 text-gray-100'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
} 