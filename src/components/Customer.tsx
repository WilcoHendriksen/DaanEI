import { Avatar, Button, makeStyles } from "@fluentui/react-components"
import { DeleteFilled, StarFilled, StarRegular } from "@fluentui/react-icons"

const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    height: "50px",
    padding: "16px",
    borderBottom: "1px solid #999"
  },
  grid: {
    width: "100%",
    marginLeft: "16px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 30px",
    gridTemplateRows: "1fr 1fr",
    gap: "0px 16px"
  }
})
export default function Customer({ customer }: { customer: Customer }) {
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
        <div>{customer.name}</div>
        <div>eieren: {customer.amount}</div>
        <Button
          icon={<DeleteFilled />}
          onClick={() => alert("verwijderen")}
        ></Button>
        <div>{customer.phoneNumber}</div>
        <div>{customer.address}</div>
      </div>
    </div>
  )
}
