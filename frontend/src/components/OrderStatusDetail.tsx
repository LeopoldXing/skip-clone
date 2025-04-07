import { Separator } from "@/components/ui/separator.tsx";
import { Order } from "@/types.ts";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
      <section className="space-y-5" aria-label="Order status details">
        <address className="flex flex-col not-italic">
          <strong className="font-bold">Delivering to:</strong>
          <span>{order.deliveryDetails.name}</span>
          <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
        </address>
        <div className="flex flex-col">
          <strong className="font-bold">Your Order</strong>
          <ul>
            {order.cartItems.map(item => (
                <li key={item.name}>
                  {item.name} x {item.quantity}
                </li>
            ))}
          </ul>
        </div>
        <Separator/>
        <div className="flex flex-col">
          <strong className="font-bold">Total</strong>
          <span>${(order.totalAmount / 100).toFixed(2)}</span>
        </div>
      </section>
  );
};

export default OrderStatusDetail;
