import { ORDER_STATUS } from "@/config/order-status-config.ts";
import { Order } from "@/types.ts";
import { Progress } from "@/components/ui/progress.tsx";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return { display: `${hours}:${paddedMinutes}`, iso: created.toISOString() };
  };

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find(status => status.value === order.status) || ORDER_STATUS[0];
  };

  const expectedDelivery = getExpectedDelivery();
  const orderStatusInfo = getOrderStatusInfo();

  return (
      <>
        <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
          <span>Order Status: {orderStatusInfo.label}</span>
          <span>
          Expected by:{" "}
            <time dateTime={expectedDelivery.iso}>{expectedDelivery.display}</time>
        </span>
        </h1>
        <Progress
            className="animate-pulse"
            value={orderStatusInfo.progressValue}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={orderStatusInfo.progressValue}
            aria-label={`Order progress: ${orderStatusInfo.label}`}
        />
      </>
  );
};

export default OrderStatusHeader;
