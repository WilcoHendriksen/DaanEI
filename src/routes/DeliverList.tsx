import useOrder from "@/queries/useOrders"
import AddCustomerDialog from "../components/AddOrderDialog"
import { Button, Title3, makeStyles } from "@fluentui/react-components"
import { AddFilled, ArrowLeftFilled } from "@fluentui/react-icons"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "@/components/layout/Loading"
import { createOrder, deleteOrder } from "@/repo/OrderRepo"
import Order from "@/components/Order"
import EmptyState from "@/components/layout/EmptyState"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "hidden"
  },
  title: {
    display: "flex",
    flex: "0",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)"
  },
  deliverList: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    overflowY: "auto"
  },
  customerToDeliver: {
    display: "flex",
    flex: "0",
    alignItems: "center",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)"
  },
  order: {
    height: "48px",
    backgroundColor: "green"
  },
  buttonBar: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "absolute",
    right: "16px",
    bottom: "16px"
  }
})

export default function DeliverList() {
  let params = useParams()
  let styles = useStyles()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { isLoading, data, refetch } = useOrder(params.date!)

  const openOrderDialog = () => {
    setOpen(true)
  }

  const addOrder = async (customer: Customer, amount: number) => {
    await createOrder({
      date: params.date!,
      customer: customer,
      name: customer.name,
      amount: amount,
      hasPaid: false,
      isDelivered: false,
      payment: customer.payment
    })
    await refetch()
  }

  const onDeleteOrder = async (order: Order) => {
    await deleteOrder(order)
    await refetch()
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <Title3>Bezorglijst: {params.date}</Title3>
      </div>
      <div className={styles.deliverList}>
        {isLoading && <Loading />}
        {!isLoading && !data?.length && (
          <EmptyState text="Geen bezorg orders" />
        )}
        {!isLoading &&
          data?.map((order) => (
            <Order
              key={order.name}
              order={order}
              onDelete={() => onDeleteOrder(order)}
            />
          ))}
      </div>
      <div className={styles.buttonBar}>
        <Button
          type="button"
          onClick={() => navigate("/delivery-dates")}
          shape="circular"
          size="large"
          icon={<ArrowLeftFilled />}
        />
        <Button
          type="button"
          onClick={() => openOrderDialog()}
          shape="circular"
          size="large"
          icon={<AddFilled />}
        />
        <AddCustomerDialog open={open} setOpen={setOpen} onSave={addOrder} />
      </div>
    </div>
  )
}
