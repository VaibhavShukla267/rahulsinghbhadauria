import { NextResponse } from 'next/server';

export async function POST(request) {
  const Razorpay = (await import('razorpay')).default;
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_SECRET || 'dummy_secret'
  });
  const amounts = {
    'newMember': 10000,
  };
  try {
    const data = await request.json();
    if (!data.membership_type) {
      return NextResponse.json({ message: "invalid request" }, { status: 400 });
    }

    let amount = 0;
    if (data.membership_type === 'donate' || data.membership_type === 'activeMember') {
      amount = Number(data.amount);
      if (!amount) {
        return NextResponse.json({ message: "invalid request" }, { status: 400 });
      }
    } else if (Object.keys(amounts).includes(data.membership_type)) {
      amount = Number(amounts[data.membership_type]);
    } else {
      return NextResponse.json({ message: "invalid request" }, { status: 400 });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${data.userId}`,
      notes: {
        user: data
      }
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
