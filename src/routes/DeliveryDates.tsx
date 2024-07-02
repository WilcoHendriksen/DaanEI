import { Button, makeStyles } from "@fluentui/react-components"
import {
  AddFilled,
  DeleteFilled,
  TaskListSquareLtr24Regular
} from "@fluentui/react-icons"
import { useState } from "react"
import SelectDeliveryDateDialog from "../components/CreateDeliveryDateDialog"
import { createDeliverDate, deleteDeliverDate } from "../repo/DeliverDateRepo"
import useDeliveryDates from "../queries/useDeliveryDates"
import Loading from "../components/layout/Loading"
import EmptyState from "../components/layout/EmptyState"
import { useNavigate } from "react-router-dom"
import { deleteOrders } from "@/repo/OrderRepo"

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
    overflowY: "auto"
  },
  buttonBar: {
    position: "absolute",
    right: "16px",
    bottom: "16px"
  },
  dateItem: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)",
    "&:hover": {
      backgroundColor: "darkgray"
    },
    "& > svg": {
      paddingLeft: "16px",
      width: "32px",
      height: "32px"
    },
    "& > p": {
      display: "flex",
      paddingLeft: "16px",
      margin: "0px",
      flex: "1",
      height: "64px",
      alignItems: "center"
    }
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

  const gotoDeliverList = (date: string) => {
    navigate(`/delivery-dates/${date}`)
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
            <div key={deliverDate.date} className={styles.dateItem}>
              <TaskListSquareLtr24Regular
                style={{ width: "32px", height: "32px" }}
              />
              <p onClick={() => gotoDeliverList(deliverDate.date)}>
                Bezorglijst: {deliverDate.date}
              </p>
              <div style={{ margin: "16px" }}>
                <Button
                  size="large"
                  shape="circular"
                  icon={<DeleteFilled />}
                  onClick={() => removeDeliveryDate(deliverDate)}
                />
              </div>
            </div>
          ))}
      </div>
      <div className={styles.buttonBar}>
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
