import AddCustomerDialog from "../components/AddCustomerDialog"
import { Button, Title3, makeStyles } from "@fluentui/react-components"
import { AddFilled, ArrowLeftFilled } from "@fluentui/react-icons"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

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
  text: {
    height: "48px"
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

  const addCustomer = () => {
    setOpen(true)
  }
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <Title3>{params.date}</Title3>
      </div>
      <div className={styles.deliverList}>
        <div className={styles.customerToDeliver}>
          <p className={styles.text}>item1</p>
        </div>
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
          onClick={() => addCustomer()}
          shape="circular"
          size="large"
          icon={<AddFilled />}
        />
        <AddCustomerDialog open={open} setOpen={setOpen} onSubmit={() => {}} />
      </div>
    </div>
  )
}
