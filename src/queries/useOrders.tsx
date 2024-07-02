import { useQuery } from "@tanstack/react-query"
import { readOrders } from "@/repo/OrderRepo"

export default function useOrder(date: string) {
  return useQuery({
    queryKey: ["order", date],
    queryFn: async () => await readOrders(date)
  })
}
