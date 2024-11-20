import useAxios from "./ApiServise";

export const shopData = () => {
  return useAxios.get(`/settings/settings/`);
};
export const cartData = async () => {
  const resp = await useAxios.get(`/store-pos/cart/`);
  return resp?.data;
};
export const updateCartData = (body: {
  cart: string;
  user: string;
  payment_method: string;
}) => {
  return useAxios.post(`/store-pos/submit/`, body);
};
export const addProductFunc = ({
  product,
  quantity,
}: {
  product: string;
  quantity?: number;
}) => {
  return useAxios.post(`/store-pos/cart-item-add/`, {
    product,
    quantity,
  });
};
export const addOrderProductWithIdentifierFunc = (body: {
  order: string;
  product: string;
  quantity: number;
}) => {
  return useAxios.post(`/store-pos/items/`, body);
};
export const productsList = (page: number, searchInp: string) => {
  const queryArray = [];
  if (searchInp) {
    queryArray.push(`search=${searchInp}`);
  }
  if (page) {
    queryArray.push(`page=${page}`);
  }
  const queryArrayString = queryArray.join("&");

  return useAxios.get(
    `/products/products/${
      queryArrayString === "" ? "" : `?${queryArrayString}`
    }&timestamp=${new Date().getTime()}`
  );
};
export const usersList = (page: number, searchInp: string) => {
  const queryArray = [];
  if (searchInp) {
    queryArray.push(`search=${searchInp}`);
  }
  if (page) {
    queryArray.push(`page=${page}`);
  }
  const queryArrayString = queryArray.join("&");

  return useAxios.get(
    `/store-pos/users/${queryArrayString === "" ? "" : `?${queryArrayString}`}`
  );
};
export const addUser = (body: {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number: string;
}) => {
  return useAxios.post(`/store-pos/users/`, body);
};
export const getUserDataFunc = async () => {
  const resp = await useAxios.get(`/accounts/user/`);
  return resp.data;
};
export const getSingleUser = (identifier: string) => {
  return useAxios.get(`/store-pos/users/${identifier}/`);
};
export const deleteProductFunc = (identifier: string) => {
  return useAxios.delete(`/store-pos/item-remove/${identifier}/`);
};
export const getOtpFunc = (body: { phone_number: string }) => {
  return useAxios.post(`/accounts/otp-login/`, body);
};
export const verifyOtpFunc = (body: { phone_number: string; code: string }) => {
  return useAxios.post(`/accounts/otp-login/`, body);
};
export const deleteOrderFunc = async (identifier: string) => {
  const resp = await useAxios.delete(`/store-pos/orders/${identifier}/`);

  return resp.data;
};
export const deleteRefundFunc = async (identifier: string) => {
  const resp = await useAxios.delete(`/store-pos/refunds/${identifier}/`);

  return resp.data;
};
export const deleteOrderItemFunc = async (identifier: string) => {
  const resp = await useAxios.delete(`/store-pos/items/${identifier}/`);

  return resp.data;
};
export const deleteRefundItemFunc = async (identifier: string) => {
  const resp = await useAxios.delete(`/store-pos/refund-items/${identifier}/`);

  return resp.data;
};
export const editOrderFunc = async ({
  identifier,
  body,
}: {
  identifier: string;
  body: {
    user: string | undefined;
    status: string;
    delivery_method?: string;
    shipping_address?: string;
    billing_address?: string;
  };
}) => {
  const resp = await useAxios.patch(`/store-pos/orders/${identifier}/`, body);

  return resp.data;
};
export const changeOrderItemQuantityFunc = ({
  order,
  orderItem,
  product,
  quantity,
}: {
  order: string;
  orderItem: string;
  product: string;
  quantity: number;
}) => {
  return useAxios.put(`/store-pos/items/${orderItem}/`, {
    order,
    product,
    quantity,
  });
};
export const addRefundFunc = (body: { user: string; reason: string }) => {
  return useAxios.post(`/store-pos/refunds/`, body);
};
export const editRefundFunc = async ({
  identifier,
  body,
}: {
  identifier: string;
  body: {
    user: string | undefined;
    reason: string;
  };
}) => {
  const resp = await useAxios.put(`/store-pos/refunds/${identifier}/`, body);

  return resp.data;
};
export const addProductRefundFunc = (body: {
  refund: string;
  product: string;
  quantity: number;
}) => {
  return useAxios.post(`/store-pos/refund-items/`, body);
};
export const changeRefundItemQuantityFunc = ({
  refund,
  refundItem,
  product,
  quantity,
}: {
  refund: string;
  refundItem: string;
  product: string;
  quantity: number;
}) => {
  return useAxios.put(`/store-pos/refund-items/${refundItem}/`, {
    refund,
    product,
    quantity,
  });
};

export const deliveryMethodFunc = async () => {
  const resp = await useAxios.get(`shipping/delivery-methods/`);
  return resp.data;
};

export const userAddressesFunc = async () => {
  const resp = await useAxios.get(`store-pos/addresses/`);
  return resp.data;
};
