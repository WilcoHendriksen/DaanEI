import { makeStyles } from "@fluentui/react-components"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    flex: "1"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
    flex: "1"
  },
  customersList: {
    display: "flex",
    flex: "1",
    flexDirection: "column"
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: "16px"
  }
})
export default function CreateList() {
  const styles = useStyles()
  return <div className={styles.page}>create list</div>
}
