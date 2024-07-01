import { useQuery } from "@tanstack/react-query"
import { readDeliverDates } from "../repo/DeliverDateRepo"

export default function useDeliveryDates() {
  return useQuery({
    queryKey: ["deliverDate"],
    queryFn: async () => await readDeliverDates()
  })
}
