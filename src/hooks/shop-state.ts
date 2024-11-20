import { shopData } from "@/api/ApiClient";
import { useQuery } from "@tanstack/react-query";

type Shop = {
  default_cover: string;
  fav_icon: string;
  logo: string;
  site_copyright: string;
  site_short_about: string;
  site_title: string;
};

export const useShop = () => {
  const { data } = useQuery({
    queryKey: ["shopDataQuery"],
    queryFn: () => shopData(),
    // initialData: {
    //   default_cover: "",
    //   fav_icon: "",
    //   logo: "",
    //   site_copyright: "",
    //   site_short_about: "",
    //   site_title: "",
    // },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { shopData: data?.data as Shop };
};
