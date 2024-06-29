import { Button, Title3, makeStyles } from "@fluentui/react-components"
import { NavigationFilled } from "@fluentui/react-icons"

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--colorNeutralBackground1Selected)"
  }
})

export default function Header({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  const styles = useStyles()
  return (
    <header className={styles.header}>
      <Button
        aria-label="navigation"
        appearance="subtle"
        shape="square"
        size="large"
        icon={<NavigationFilled />}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Title3>
        <strong>Daan's EI app</strong>
      </Title3>
      <div></div>
    </header>
  )
}
