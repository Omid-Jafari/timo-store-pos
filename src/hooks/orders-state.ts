import useAxios from "@/api/ApiServise";
import { useQuery } from "@tanstack/react-query";

export type OrderItem = {
  identifier: string;
  quantity: number;
  gross_price: string;
  net_price: number;
  gross_total: number;
  net_total: number;
  discount: string;
  discount_amount: number;
  product: {
    identifier: string;
    title: string;
    link_title: string;
    cover: string;
    stock_amount: number;
    unit: {
      identifier: string;
      title: string;
      plural_title: string;
    };
  };
};

export type Order = {
  identifier: string;
  user: {
    identifier: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    email: string;
    date_joined: string;
    last_login: null;
  } | null;
  ref_id: 17742;
  origin: string;
  payment_method: string;
  humanized_payment_method: string;
  delivery_method: {
    icon: string;
    identifier: string;
    title: string;
  } | null;
  status: string;
  humanized_status: string;
  gross_total: string;
  net_total: string;
  discount_amount: string;
  created_at: string;
  modified_at: string;
  delivery_cost: string | null;
  delivery_payment: string;
  shipping_address: {
    city: string;
    city_area: string;
    country: { code: string; name: string };
    country_area: string;
    identifier: string;
    postal_code: string;
    street_address: string;
    title: string;
  } | null;
  billing_address: {
    city: string;
    city_area: string;
    country: { code: string; name: string };
    country_area: string;
    identifier: string;
    postal_code: string;
    street_address: string;
    title: string;
  } | null;
  items: OrderItem[];
};
type Orders = {
  count: number;
  num_pages: number;
  next: string | null;
  previous: string | null;
  results: Order[];
};

export const useOrders = ({
  origin,
  status,
  page,
  search,
}: {
  origin: "store_pos" | "checkout";
  status?: "paid" | "unpaid" | "all" | undefined;
  page: number;
  search: string;
}) => {
  const { data, isPending } = useQuery({
    queryKey: ["ordersDataQuery", origin, status, page, search],
    queryFn: async () => {
      const queryArray = [];

      if (status) {
        queryArray.push(`status=${status}`);
      }
      if (search) {
        queryArray.push(`search=${search}`);
      }
      if (origin) {
        queryArray.push(`origin=${origin}`);
      }
      if (page) {
        queryArray.push(`page=${page}`);
      }

      const queryArrayString = queryArray.join("&");
      const insp = await useAxios.get(
        `/store-pos/orders/${
          queryArrayString === "" ? "" : `?${queryArrayString}`
        }`
      );

      return insp?.data;
    },
  });

  return { orderData: data as Orders, isPending };
};
