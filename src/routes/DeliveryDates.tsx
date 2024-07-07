import { Button, makeStyles } from "@fluentui/react-components"
import { AddFilled, ArrowLeftFilled } from "@fluentui/react-icons"
import { useState } from "react"
import SelectDeliveryDateDialog from "../components/CreateDeliveryDateDialog"
import { createDeliverDate, deleteDeliverDate } from "../repo/DeliverDateRepo"
import useDeliveryDates from "../queries/useDeliveryDates"
import Loading from "../components/layout/Loading"
import EmptyState from "../components/layout/EmptyState"
import { useNavigate } from "react-router-dom"
import { deleteOrders } from "@/repo/OrderRepo"
import DeliveryDate from "@/components/layout/DeliveryDate"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "hidden"
  },
  datesList: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden"
  },
  buttonBar: {
    position: "absolute",
    right: "16px",
    bottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }
})
export default function DeliveryDates() {
  const styles = useStyles()
  const { isLoading, data, refetch } = useDeliveryDates()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const addDate = () => {
    setOpen(true)
  }

  const addDeliveryDate = async (deliverDate: DeliverDate) => {
    await createDeliverDate(deliverDate)
    await refetch()
  }

  const removeDeliveryDate = async (deliverDate: DeliverDate) => {
    await deleteDeliverDate(deliverDate)
    await deleteOrders(deliverDate.date)
    await refetch()
  }

  return (
    <div className={styles.page}>
      <div className={styles.datesList}>
        {isLoading && <Loading />}
        {!isLoading && !data?.length && (
          <EmptyState text="Geen bezorg datums" />
        )}
        {data &&
          !isLoading &&
          data.map((deliverDate) => (
            <DeliveryDate
              deliveryDate={deliverDate}
              removeDeliveryDate={removeDeliveryDate}
            />
          ))}
      </div>
      <div className={styles.buttonBar}>
        <Button
          type="button"
          onClick={() => navigate("/home")}
          shape="circular"
          size="large"
          icon={<ArrowLeftFilled />}
        />
        <Button
          type="button"
          onClick={() => addDate()}
          shape="circular"
          size="large"
          icon={<AddFilled />}
        />
        <SelectDeliveryDateDialog
          open={open}
          setOpen={setOpen}
          onSubmit={(d) => addDeliveryDate(d)}
        />
      </div>
    </div>
  )
}
