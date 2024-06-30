import { Button, makeStyles } from "@fluentui/react-components"
import { AddFilled } from "@fluentui/react-icons"
import { useState } from "react"
import SelectDeliveryDateDialog from "../components/SelectDeliveryDateDialog"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flex: "1",
    flexDirection: "column"
  },
  list: {
    display: "flex",
    flex: "1"
  },
  buttonBar: {
    position: "absolute",
    right: "16px",
    bottom: "16px"
  }
})
export default function DeliveryDates() {
  const styles = useStyles()

  const [open, setOpen] = useState(false)
  const addDate = () => {
    setOpen(true)
  }
  return (
    <div className={styles.page}>
      <div className={styles.list}></div>
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
          onSubmit={(d) => alert(d.date)}
        />
      </div>
    </div>
  )
}
