import { Button, makeStyles, mergeClasses } from "@fluentui/react-components"
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
import { useState } from "react"
import { useSwipeable } from "react-swipeable"

const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    height: "96px",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)",
    minHeight: "96px"
  },
  grid: {
    width: "100%",
    marginLeft: "8px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "24px 24px 24px",
    userSelect: "none",
    gap: "0px 0px",
    "& > div": {
      display: "flex",
      alignItems: "center",
      "& > svg": {
        marginRight: "8px"
      }
    }
  },
  deleteButton: {
    backgroundColor: "darkred",
    width: "0px",
    height: "96px",
    display: "flex",
    alignItems: "center",
    transition: "width 1s ease"
  },
  transform: {
    width: "48px"
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
  const [longPressedActive, setLongPressedActive] = useState(false)
  const handlers = useSwipeable({
    onSwipedLeft: () => alert("left: " + order),
    onSwipedRight: () => console.log("right: " + order)
  })
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: order.name
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "150"
  }

  let timer: NodeJS.Timeout | null
  const onTouchStart = (_e: React.TouchEvent<HTMLElement>) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        setLongPressedActive(true)
      }, 1000)
    }
  }

  const onTouchEnd = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return (
    <div className={styles.main} ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} style={{ touchAction: "none" }}>
        <ReOrderDotsVerticalFilled fontSize={24} />
      </div>
      <div
        className={styles.grid}
        onTouchStart={(e) => onTouchStart(e)}
        onTouchEnd={onTouchEnd}
        onClick={() => setLongPressedActive(false)}
        {...handlers}
      >
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
      <div
        className={mergeClasses(
          styles.deleteButton,
          longPressedActive && styles.transform
        )}
      >
        <Button
          style={{ marginLeft: "4px", marginRight: "4px" }}
          shape="circular"
          size="large"
          icon={<DeleteFilled />}
          onClick={onDelete}
        />
      </div>
    </div>
  )
}
