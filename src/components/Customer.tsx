import { Avatar, Button, makeStyles } from "@fluentui/react-components"
import {
  DeleteFilled,
  EditFilled,
  StarFilled,
  StarRegular
} from "@fluentui/react-icons"

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
    gridTemplateColumns: "1fr 1fr 30px",
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
      <Avatar
        name={customer.name}
        badge={{
          icon: customer.isFavorite ? (
            <StarFilled color="yellow" />
          ) : (
            <StarRegular color="yellow" />
          )
        }}
      />
      <div className={styles.grid}>
        <div className={styles.text}>{customer.name}</div>
        <div className={styles.text}>eieren: {customer.amount}</div>
        <Button icon={<DeleteFilled />} onClick={onDelete}></Button>
        <div className={styles.text}>{customer.phoneNumber}</div>
        <div className={styles.text}>{customer.address}</div>
        <Button icon={<EditFilled />} onClick={onEdit}></Button>
      </div>
    </div>
  )
}
