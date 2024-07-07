import useOrder from "@/queries/useOrders"
import AddCustomerDialog from "../components/AddOrderDialog"
import {
  Button,
  Title3,
  ToggleButton,
  makeStyles
} from "@fluentui/react-components"
import {
  AddFilled,
  ArrowLeftFilled,
  bundleIcon,
  EyeFilled,
  EyeOffFilled
} from "@fluentui/react-icons"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Loading from "@/components/layout/Loading"
import {
  createOrUpdateOrder,
  createOrders,
  deleteOrder,
  deleteOrders
} from "@/repo/OrderRepo"
import Order from "@/components/Order"
import EmptyState from "@/components/layout/EmptyState"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { useMutation } from "@tanstack/react-query"

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
    overflowY: "auto",
    overflowX: "hidden"
  },
  customerToDeliver: {
    display: "flex",
    flex: "0",
    alignItems: "center",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)"
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
  const [hideDelivered, setHideDelivered] = useState(true)
  const { isLoading, data, refetch } = useOrder(params.date!)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const openOrderDialog = () => {
    setOpen(true)
  }

  const addOrder = async (customer: Customer, amount: number) => {
    await createOrUpdateOrder({
      order: data?.length ?? 0,
      date: params.date!,
      customer: customer,
      name: customer.name,
      amount: amount,
      payment: customer.payment
    })
    await refetch()
  }

  const onDeleteOrder = async (order: Order) => {
    await deleteOrder(order)
    await refetch()
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = data!.findIndex((o) => o.name === active.id)
      const newIndex = data!.findIndex((o) => o.name === over.id)
      const newData = arrayMove(data!, oldIndex, newIndex)
      await mutation.mutateAsync(newData)
      await refetch()
    }
  }

  const mutation = useMutation({
    mutationFn: async (reorderedOrders: Order[]) => {
      const updatedOrder = reorderedOrders.map((o, i) => {
        let newOrder = { ...o }
        newOrder.order = i
        return newOrder
      })
      await deleteOrders(updatedOrder[0].date)
      await createOrders(updatedOrder)
    }
  })

  let filteredOrders: Order[] = data ?? []
  if (hideDelivered)
    filteredOrders = data?.filter((o) => o.payment === "") ?? []

  const ordersToRender = filteredOrders?.sort((a, b) => a.order - b.order)

  const HideDeliverdIcon = bundleIcon(EyeFilled, EyeOffFilled)
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <Title3>Bezorglijst: {params.date}</Title3>
        <ToggleButton
          style={{ marginLeft: "8px" }}
          shape="circular"
          size="large"
          icon={<HideDeliverdIcon />}
          onClick={() => setHideDelivered(!hideDelivered)}
        />
      </div>
      <div className={styles.deliverList}>
        {isLoading && <Loading />}
        {!isLoading && !ordersToRender?.length && (
          <EmptyState text="Geen bezorg orders" />
        )}
        {!isLoading && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={ordersToRender!.map((x) => x.name)}
              strategy={verticalListSortingStrategy}
            >
              {ordersToRender?.map((order) => (
                <Order
                  key={order.name}
                  order={order}
                  onDelete={() => onDeleteOrder(order)}
                  refetch={refetch}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
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
