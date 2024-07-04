import { Button, makeStyles } from "@fluentui/react-components"
import {
  DeleteFilled,
  MailCheckmarkRegular,
  MailDismissRegular,
  MoneyOffRegular,
  MoneyRegular,
  PaymentRegular,
  ReOrderDotsVerticalFilled
} from "@fluentui/react-icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    height: "96px",
    padding: "12px",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)",
    backgroundColor: "green",
    minHeight: "96px"
  },
  grid: {
    width: "100%",
    marginLeft: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "32px 32px 32px",
    gap: "0px 0px",
    "& > div": {
      display: "flex",
      alignItems: "center",
      "& > svg": {
        marginRight: "8px"
      }
    }
  },
  text: {}
})
export default function Order({
  order,
  onDelete
}: {
  order: Order
  onDelete: () => void
}) {
  const styles = useStyles()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: order.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div className={styles.main} ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners}>
        <ReOrderDotsVerticalFilled />
      </div>
      <div className={styles.grid}>
        <div className={styles.text}>{order.name}</div>
        <div className={styles.text}>Aantal: {order.amount}</div>
        <div className={styles.text}>{order.customer.address}</div>
        <div className={styles.text}>
          Bedrag: € {(order.amount * 0.22).toFixed(2)}
        </div>
        <div>
          <PaymentRegular />
          {order.payment}
        </div>
        <div>
          {order.isDelivered ? (
            <MailCheckmarkRegular />
          ) : (
            <MailDismissRegular />
          )}
          afgeleverd: {order.isDelivered ? "ja" : "nee"}
        </div>
        <div>
          {order.hasPaid ? <MoneyRegular /> : <MoneyOffRegular />}
          betaald: {order.hasPaid ? "ja" : "nee"}
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
