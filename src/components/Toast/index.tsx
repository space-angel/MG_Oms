import { CheckCircleIcon } from '../Icons';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="inline-flex items-center p-8 gap-3 bg-white shadow-toast rounded-16 fixed z-50 left-1/2 -translate-x-1/2 top-8 
      animate-[slideDown_0.3s_ease-out] opacity-100 transition-opacity duration-300"
    >
      <CheckCircleIcon className="text-semantic-main-100 w-10 h-10" />
      <span className="font-pretendard Title_28_Medium text-gray-100 whitespace-nowrap">
        {message}
      </span>
    </div>
  );
} 