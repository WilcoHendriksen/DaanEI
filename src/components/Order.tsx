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
    padding: "8px",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)",
    minHeight: "96px"
  },
  grid: {
    width: "100%",
    marginLeft: "8px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "24px 24px 24px",
    gap: "0px 0px",
    "& > div": {
      display: "flex",
      alignItems: "center",
      "& > svg": {
        marginRight: "8px"
      }
    }
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
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: order.name
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "150"
  }

  return (
    <div className={styles.main} ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} style={{ touchAction: "none" }}>
        <ReOrderDotsVerticalFilled fontSize={32} />
      </div>
      <div className={styles.grid}>
        <div>{order.name}</div>
        <div>Aantal: {order.amount}</div>
        <div>{order.customer.address}</div>
        <div>Bedrag: € {(order.amount * 0.22).toFixed(2)}</div>
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
