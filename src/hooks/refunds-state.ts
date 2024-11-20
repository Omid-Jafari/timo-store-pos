import useAxios from "@/api/ApiServise";
import { useQuery } from "@tanstack/react-query";

export type RefundItem = {
  identifier: string;
  product: {
    stock_amount: number;
    identifier: string;
    title: string;
    link_title: string;
    cover: string;
    unit: {
      identifier: string;
      title: string;
      plural_title: string;
    };
  };
  quantity: number;
};
export type Refund = {
  identifier: string;
  user: {
    identifier: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  reason: string;
  items: RefundItem[];
  created_at: string;
  modified_at: string;
};
type Refunds = {
  count: number;
  num_pages: number;
  next: string | null;
  previous: string | null;
  results: Refund[];
};

export const useRefunds = ({
  page,
  search,
}: {
  page: number;
  search: string;
}) => {
  const { data, isPending } = useQuery({
    queryKey: ["refundsDataQuery", page, search],
    queryFn: async () => {
      const queryArray = [];

      if (search) {
        queryArray.push(`search=${search}`);
      }
      if (page) {
        queryArray.push(`page=${page}`);
      }

      const queryArrayString = queryArray.join("&");
      const insp = await useAxios.get(
        `/store-pos/refunds/${
          queryArrayString === "" ? "" : `?${queryArrayString}`
        }`
      );

      return insp?.data;
    },
  });

  return { refundData: data as Refunds, isPending };
};
