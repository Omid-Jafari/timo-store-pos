import { cartData } from "@/api/ApiClient";
import { QueryClient, useQuery } from "@tanstack/react-query";

export type Product = {
  identifier: string;
  title: string;
  link_title: string;
  cover: string;
  discount_active: boolean;
  discount_percent: number;
  gross_price: number;
  net_price: number;
  stock_status: boolean;
  stock_amount: number;
  free_delivery: boolean;
  short_description: string;
  unit: {
    identifier: string;
    title: string;
    plural_title: string;
  };
  categories: [
    {
      identifier: string;
      title: string;
      link_title: string;
      cover: string;
    }
  ];
};
export type CartItem = {
  identifier: string;
  cart: {
    identifier: string;
    discount_amount: string;
    gross_total: string;
    net_total: string;
  };
  product: Product;
  quantity: number;
  gross_price: string;
  net_price: string;
  discount: string;
  discount_amount: string;
  gross_total: string;
  net_total: string;
};
export type Cart = {
  identifier: string;
  discount_amount: string;
  gross_total: string;
  net_total: string;
  items_count: number;
  ref_id: number | undefined;
  items: CartItem[];
  humanized_payment_method: string | undefined;
  customerData: { full_name: string } | undefined;
};
let cartIdentifier = !!localStorage.getItem("cartIdentifier");
export const updateCart = ({
  queryClient,
  cartData,
  cartItem,
}: {
  queryClient: QueryClient;
  cartData: Cart | undefined;
  cartItem: CartItem;
}) => {
  cartIdentifier = true;
  const newCartItems = cartData?.items || [];
  const foundIndex = newCartItems.findIndex(
    (cItem) => cItem?.identifier === cartItem?.identifier
  );
  if (foundIndex !== -1) newCartItems[foundIndex] = cartItem;
  else newCartItems.push({ ...cartItem });

  queryClient.setQueryData(["cartDataQuery"], {
    ...(cartData ? cartData : null),
    items: newCartItems,
    ...cartItem?.cart,
  });
};
export const removeFromCart = ({
  queryClient,
  cartData,
  cartItem,
}: {
  queryClient: QueryClient;
  cartData: Cart;
  cartItem: CartItem;
}) => {
  const newCartItems = cartData?.items?.filter(
    (prevCartItem: CartItem) =>
      prevCartItem?.product?.identifier !== cartItem?.product?.identifier
  );

  queryClient.setQueryData(["cartDataQuery"], {
    ...(cartData ? cartData : null),
    items: newCartItems,
    discount_amount: +cartData?.discount_amount - +cartItem?.discount_amount,
    gross_total: +cartData?.gross_total - +cartItem?.gross_total,
    net_total: +cartData?.net_total - +cartItem?.net_total,
    items_count: +cartData?.items_count - 1,
  });
};

export const useCart = () => {
  const { data } = useQuery({
    queryKey: ["cartDataQuery"],
    queryFn: () => cartData(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: cartIdentifier,
  });

  return { cartData: data as Cart };
};
