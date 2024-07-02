import { Avatar, Button, makeStyles } from "@fluentui/react-components"
import { DeleteFilled, StarFilled, StarRegular } from "@fluentui/react-icons"

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
export default function Order({
  order,
  onDelete
}: {
  order: Order
  onDelete: () => void
}) {
  const styles = useStyles()
  return (
    <div className={styles.main}>
      <Avatar
        name={order.name}
        badge={{
          icon: order.customer.isFavorite ? (
            <StarFilled color="yellow" />
          ) : (
            <StarRegular color="yellow" />
          )
        }}
      />
      <div className={styles.grid}>
        <div className={styles.text}>{order.name}</div>
        <div className={styles.text}>Aantal: {order.amount}</div>
        <div className={styles.text}>{order.customer.address}</div>
        <div className={styles.text}>
          Bedrag: € {(order.amount * 0.22).toFixed(2)}
        </div>
      </div>
      <Button
        shape="circular"
        size="large"
        icon={<DeleteFilled />}
        onClick={onDelete}
      ></Button>
    </div>
  )
}
