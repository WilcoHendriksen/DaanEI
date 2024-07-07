import { Button, makeStyles, mergeClasses } from "@fluentui/react-components"
import {
  ArrowResetFilled,
  DeleteFilled,
  MoneyRegular,
  PaymentRegular,
  ReOrderDotsVerticalFilled,
  ViewDesktopMobileFilled
} from "@fluentui/react-icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { createOrUpdateOrder } from "@/repo/OrderRepo"
import { QueryObserverResult } from "@tanstack/react-query"

const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    height: "96px",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)",
    minHeight: "96px",
    position: "relative"
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
  },
  deleteButton: {
    backgroundColor: "darkred",
    position: "absolute",
    right: "-48px",
    height: "96px",
    display: "flex",
    alignItems: "center",
    transition: "right 200ms ease"
  },
  transformDeleteButton: {
    right: "0px"
  },
  paymentButtons: {
    backgroundColor: "darkgreen",
    position: "absolute",
    left: "-144px",
    height: "96px",
    display: "flex",
    alignItems: "center",
    transition: "left 400ms ease"
  },
  paymentButtonsTransform: {
    left: "0px"
  }
})
export default function Order({
  order,
  onDelete,
  refetch
}: {
  order: Order
  onDelete: () => void
  refetch: () => Promise<QueryObserverResult<Order[], Error>>
}) {
  const styles = useStyles()
  const [longPressedActive, setLongPressedActive] = useState(false)
  // const [swipeLeftActive, setSwipeLeftActive] = useState(false)
  const [swipeRightActive, setSwipeRightActive] = useState(false)
  const handlers = useSwipeable({
    // onSwipedLeft: () => onSwipeLeft(),
    onSwipedRight: () => onSwipeRight()
  })
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: order.name
  })

  const style = {
    transform: CSS.Transform.toString(transform)
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

  const onSwipeRight = () => {
    onTouchEnd()
    setSwipeRightActive(true)
  }

  // const onSwipeLeft = () => {
  //   onTouchEnd()
  //   setSwipeLeftActive(true)
  // }

  const onPaidWithMoney = async (order: Order) => {
    resetView()
    // betaald ja, afgeleverd en contant
    await createOrUpdateOrder({
      ...order,
      payment: "contant"
    })
    await refetch()
  }

  const onPaidingWithTikkie = async (order: Order) => {
    resetView()
    // betaald nee, afgeleverd en tikkie
    await createOrUpdateOrder({
      ...order,
      payment: "tikkie"
    })
    await refetch()
  }

  const onResetPayment = async (order: Order) => {
    resetView()
    // betaald nee, niet afgeleverd tikkie/contant blijft staan.
    await createOrUpdateOrder({
      ...order,
      payment: ""
    })
    await refetch()
  }

  const resetView = () => {
    setLongPressedActive(false)
    setSwipeRightActive(false)
    // setSwipeLeftActive(false)
  }

  return (
    <div className={styles.main} ref={setNodeRef} style={style}>
      <div
        className={mergeClasses(
          styles.paymentButtons,
          swipeRightActive && styles.paymentButtonsTransform
        )}
      >
        <Button
          style={{ marginLeft: "4px", marginRight: "4px" }}
          shape="circular"
          size="large"
          icon={<ViewDesktopMobileFilled />}
          onClick={() => onPaidingWithTikkie(order)}
        />
        <Button
          style={{ marginLeft: "4px", marginRight: "4px" }}
          shape="circular"
          size="large"
          icon={<MoneyRegular />}
          onClick={() => onPaidWithMoney(order)}
        />
        <Button
          style={{ marginLeft: "4px", marginRight: "4px" }}
          shape="circular"
          size="large"
          icon={<ArrowResetFilled />}
          onClick={() => onResetPayment(order)}
        />
      </div>
      <div {...attributes} {...listeners} style={{ touchAction: "none" }}>
        <ReOrderDotsVerticalFilled fontSize={24} />
      </div>
      <div
        className={styles.grid}
        onTouchStart={(e) => onTouchStart(e)}
        onTouchEnd={onTouchEnd}
        onClick={() => resetView()}
        {...handlers}
      >
        <div>{order.name}</div>
        <div>{order.customer.address}</div>
        <div>{order.customer.phoneNumber}</div>
        <div>Bedrag: € {(order.amount * 0.22).toFixed(2)}</div>
        <div>Aantal: {order.amount}</div>
        <div>
          <PaymentRegular />
          {order.payment}
        </div>
      </div>
      <div
        className={mergeClasses(
          styles.deleteButton,
          longPressedActive && styles.transformDeleteButton
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
