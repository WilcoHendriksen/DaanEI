import { makeStyles } from "@fluentui/react-components"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center"
  }
})
export default function NoCustomers({ text }: { text: string }) {
  const styles = useStyles()
  return <div className={styles.page}>{text}</div>
}
