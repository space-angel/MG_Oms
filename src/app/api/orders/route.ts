import { NextRequest, NextResponse } from 'next/server';
import { 
  createOrder, 
  getOrdersByTimeSlot, 
  updateOrderStatus,
  deleteOrder 
} from '@/lib/firebase/orders';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeSlot = searchParams.get('time') || 'ALL';
    
    const orders = await getOrdersByTimeSlot(timeSlot);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: '주문 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const newOrder = await createOrder(orderData);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '주문 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();
    await updateOrderStatus(orderId, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '주문 상태 업데이트에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    await deleteOrder(orderId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '주문 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
} 