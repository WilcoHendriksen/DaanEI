import { Button, makeStyles, mergeClasses } from "@fluentui/react-components"
import { DeleteFilled, TaskListSquareLtr24Regular } from "@fluentui/react-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSwipeable } from "react-swipeable"

const useStyles = makeStyles({
  deleteButton: {
    paddingLeft: "4px",
    paddingRight: "4px",
    height: "60px",
    display: "flex",
    position: "absolute",
    right: "-48px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkred",
    transition: "right 200ms ease"
  },
  deleteButtonTransform: {
    right: "0px"
  },
  dateItem: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)",
    position: "relative",
    "&:hover": {
      backgroundColor: "darkgray"
    },
    "& > svg": {
      paddingLeft: "16px",
      width: "32px",
      height: "32px"
    },
    "& > p": {
      display: "flex",
      paddingLeft: "16px",
      margin: "0px",
      flex: "1",
      height: "64px",
      alignItems: "center"
    }
  }
})

export default function DeliveryDate({
  deliveryDate,
  removeDeliveryDate
}: {
  deliveryDate: DeliverDate
  removeDeliveryDate: (deliveryDate: DeliverDate) => Promise<void>
}) {
  const styles = useStyles()
  const navigate = useNavigate()
  const [swipeLeftActive, setSwipeLeftActive] = useState(false)

  const gotoDeliverList = (date: string) => {
    navigate(`/delivery-dates/${date}`)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipeLeft(),
    onSwipedRight: () => onSwipeRight()
  })

  const onSwipeLeft = () => {
    setSwipeLeftActive(true)
  }

  const onSwipeRight = () => {
    setSwipeLeftActive(false)
  }

  return (
    <div key={deliveryDate.date} className={styles.dateItem}>
      <TaskListSquareLtr24Regular style={{ width: "32px", height: "32px" }} />
      <p {...handlers} onClick={() => gotoDeliverList(deliveryDate.date)}>
        Bezorglijst: {deliveryDate.date}
      </p>
      <div
        className={mergeClasses(
          styles.deleteButton,
          swipeLeftActive && styles.deleteButtonTransform
        )}
      >
        <Button
          size="large"
          shape="circular"
          icon={<DeleteFilled />}
          onClick={() => removeDeliveryDate(deliveryDate)}
        />
      </div>
    </div>
  )
}
