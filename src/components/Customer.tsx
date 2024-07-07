import { Avatar, Button, makeStyles } from "@fluentui/react-components"
import { DeleteFilled, EditFilled } from "@fluentui/react-icons"

const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    height: "60px",
    padding: "12px",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)"
  },
  grid: {
    width: "100%",
    marginLeft: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "32px 32px",
    gap: "0px 0px"
  },
  text: {
    display: "flex",
    alignItems: "center"
  }
})
export default function Customer({
  customer,
  onDelete,
  onEdit
}: {
  customer: Customer
  onDelete: () => void
  onEdit: () => void
}) {
  const styles = useStyles()
  return (
    <div className={styles.main}>
      <Avatar name={customer.name} />
      <div className={styles.grid}>
        <div className={styles.text}>{customer.name}</div>
        <div className={styles.text}>{customer.amount}</div>
        <div className={styles.text}>{customer.phoneNumber}</div>
        <div className={styles.text}>{customer.address}</div>
      </div>
      <Button
        size="large"
        shape="circular"
        icon={<EditFilled />}
        onClick={onEdit}
      />
      <Button
        style={{ marginLeft: "16px" }}
        size="large"
        shape="circular"
        icon={<DeleteFilled />}
        onClick={onDelete}
      />
    </div>
  )
}
