import { useGetMyOrders } from "@/api/OrderApi.ts";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import OrderStatusHeader from "@/components/OrderStatusHeader.tsx";
import OrderStatusDetail from "@/components/OrderStatusDetail.tsx";
import { useEffect } from "react";

const OrderStatusPage = () => {
  useEffect(() => {
    document.title = 'My Orders';
  }, []);

  const { myOrders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <p role="status">Loading...</p>;
  }

  if (!myOrders || myOrders.length === 0) {
    return <p role="status">No orders found</p>;
  }

  return (
      <section role="main" aria-label="My Orders">
        <div className="space-y-10">
          {myOrders.map(order => (
              <section
                  className="space-y-10 bg-gray-50 p-10 rounded-lg"
                  key={order._id}
                  aria-labelledby={`order-${order._id}-header`}
              >
                <OrderStatusHeader order={order}/>
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={order}/>
                  <AspectRatio ratio={16 / 5}>
                    <img
                        src={order.restaurant.imageUrl}
                        className="rounded-md object-cover h-full w-full"
                        alt={`Image of ${order.restaurant.restaurantName}`}
                    />
                  </AspectRatio>
                </div>
              </section>
          ))}
        </div>
      </section>
  );
};

export default OrderStatusPage;
