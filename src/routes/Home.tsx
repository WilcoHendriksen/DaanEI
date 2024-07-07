import { makeStyles } from "@fluentui/react-components"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
  page: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "120px",
    gap: "16px",
    padding: "16px"
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    border: "1px solid var(--colorNeutralBackground1Selected)"
  }
})
export default function Home() {
  const navigate = useNavigate()
  const styles = useStyles()
  return (
    <div className={styles.page}>
      <div className={styles.item} onClick={() => navigate("/delivery-dates")}>
        <p>Bezorglijsten</p>
      </div>
      <div className={styles.item} onClick={() => navigate("/customers")}>
        <p>Klanten</p>
      </div>
      <div></div>
    </div>
  )
}
