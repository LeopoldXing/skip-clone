import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Order, OrderStatus } from "@/types.ts";
import { useEffect, useState } from "react";
import { ORDER_STATUS } from "@/config/order-status-config.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi.ts";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateOrderStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (prevStatus: OrderStatus) => {
    await updateOrderStatus({ orderId: order._id as string, status: prevStatus });
    setStatus(prevStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle className="grid md:grid-cols-[2fr_2fr_1fr_1fr] gap-4 justify-between mb-3">
            <div>
              Customer Name:
              <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
            </div>
            <div>
              Delivery address:
              <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
            </div>
            <div>
              Time:
              <span className="ml-2 font-normal">{getTime()}</span>
            </div>
            <div>
              Total Cost:
              <span className="ml-2 font-normal">
              ${(order.totalAmount / 100).toFixed(2)}
            </span>
            </div>
          </CardTitle>
          <Separator/>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {order.cartItems.map(cartItem => (
                <span key={cartItem.name}>
                  <Badge variant="outline" className="mr-2">
                    {cartItem.quantity}
                  </Badge>{cartItem.name}
                </span>
            ))}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">What is the status of this order?</Label>
            <Select value={status} disabled={isLoading} onValueChange={value => handleStatusChange(value as OrderStatus)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Status"/>
              </SelectTrigger>
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (<SelectItem value={status.value} key={status.value}>{status.label}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
  );
};

export default OrderItemCard;