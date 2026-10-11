import { OrderSuccessView } from "@/components/order-success-view";

export const metadata = { title: "Order confirmed" };

export default function OrderSuccessPage({ searchParams }: { searchParams: { demo?: string; order?: string } }) {
  const orderId = typeof searchParams.order === "string" && /^[a-f0-9]{24}$/i.test(searchParams.order) ? searchParams.order : null;
  return <OrderSuccessView demo={searchParams.demo === "1"} orderId={orderId} />;
}
