// app/store/order/[orderId]/page.jsx (Server component by default)
import OrderConfirmationClient from './OrderConfirmationClient';

export default async function  OrderConfirmationPage({ params }) {
  const p = await params
  console.log(p)
  const { orderid } = p;
  console.log(orderid)
  return <OrderConfirmationClient orderId={orderid} />;
}
