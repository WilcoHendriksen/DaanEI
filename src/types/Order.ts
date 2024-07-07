type Order = {
  order: number
  date: string
  name: string
  customer: Customer
  amount: number
  payment: "tikkie" | "contant" | ""
}
