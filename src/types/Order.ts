type Order = {
  date: string
  name: string
  customer: Customer
  amount: number
  isDelivered: boolean
  payment: "tikkie" | "contant"
  hasPaid: boolean
}
