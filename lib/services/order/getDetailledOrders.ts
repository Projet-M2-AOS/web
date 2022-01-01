import { getProduct } from "@lib/services/product/getProduct";
import { getUser } from "@lib/services/user/getUser";
import axios from "axios";
import { DetailledOrder, Order } from "types/order";

export const getDetailledOrders = async (
  userId: string,
  start: number,
  end: number
) => {
  return await axios
    .get<Order[]>("/api/orders", { params: { userId } })
    .then(async ({ data }) => {
      const orders = await Promise.all(
        data.slice(start, end).map<Promise<DetailledOrder>>(async (order) => ({
          _id: order._id,
          address: order.address,
          paymentState: order.paymentState,
          price: order.price,
          user: await getUser(order.user),
          products: await Promise.all(order.products.map(getProduct)),
        }))
      );
      return {
        orders,
        total: data.length,
      };
    });
};
