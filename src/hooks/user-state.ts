import { getUserDataFunc } from "@/api/ApiClient";
import { useQuery } from "@tanstack/react-query";

export type User = {
  date_joined: string;
  email: string;
  first_name: string;
  identifier: string;
  last_login: string;
  last_name: string;
  phone_number: string;
};

export const useUser = () => {
  const { data } = useQuery({
    queryKey: ["getUserDataQuery"],
    queryFn: () => getUserDataFunc(),
  });

  return { user: data as User };
};
