import { Button, Title3, makeStyles } from "@fluentui/react-components"
import { AddFilled } from "@fluentui/react-icons"
import { useParams, Link } from "react-router-dom"

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
    position: "absolute",
    right: "16px",
    bottom: "16px"
  }
})

export default function DeliverList() {
  let params = useParams()
  let styles = useStyles()

  const addCustomer = () => {
    alert("add")
  }
  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <Title3>{params.date}</Title3>
        <Link to="/delivery-dates">back</Link>
      </div>
      <div className={styles.deliverList}>
        <div className={styles.customerToDeliver}>
          <p className={styles.text}>item1</p>
        </div>
      </div>
      <div className={styles.buttonBar}>
        <Button
          type="button"
          onClick={() => addCustomer()}
          shape="circular"
          size="large"
          icon={<AddFilled />}
        />
      </div>
    </div>
  )
}
