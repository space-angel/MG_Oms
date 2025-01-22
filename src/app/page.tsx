import { redirect } from 'next/navigation';

export default function MainPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-10">
      <header className="h-[70px] bg-white border-b border-[rgba(0,27,55,0.1)]">
        <div className="flex items-center h-full px-8">
          <nav className="flex gap-6">
            <button className="text-gray-100 Head_20_Medium">주문관리</button>
            <button className="text-gray-80 Head_20_Medium">계산기</button>
            <button className="text-gray-80 Head_20_Medium">고객정보</button>
          </nav>
          <div className="flex-1 mx-8">
            <input 
              type="text" 
              placeholder="/ 를 눌러 이름을 검색하세요" 
              className="w-full px-4 py-2 bg-gray-10 rounded-lg"
            />
          </div>
        </div>
      </header>
      <main className="flex-1 p-8">
        {/* 메인 콘텐츠 */}
      </main>
    </div>
  );
}
