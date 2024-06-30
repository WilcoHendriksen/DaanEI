import { useQuery } from "@tanstack/react-query"
import { readCustomers } from "../repo/CustomerRepo"

export default function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => await readCustomers()
  })
}
