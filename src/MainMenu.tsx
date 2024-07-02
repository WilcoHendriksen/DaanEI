import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  MenuItem,
  MenuList,
  makeStyles
} from "@fluentui/react-components"
import { DismissRegular } from "@fluentui/react-icons"
import { ReactNode, useState } from "react"
import { router } from "./routes/router"
import Header from "./components/Header"

const useStyles = makeStyles({
  app: {
    display: "flex",
    flex: 1
  },
  mainSection: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyItems: "stretch",
    alignItems: "stretch"
  },
  drawerBody: {
    display: "flex",
    flex: "1",
    flexDirection: "column"
  },
  menuList: {
    display: "flex",
    flex: "1"
  },
  version: {
    display: "flex",
    flex: "0"
  }
})

export default function MainMenu({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const styles = useStyles()

  const NavigateAway = async (path: string) => {
    setIsOpen(false)
    router.navigate(path)
  }
  console.log(import.meta.env)
  return (
    <div className={styles.app}>
      <Drawer
        separator
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="transparent"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsOpen(false)}
              />
            }
          >
            Menu
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody className={styles.drawerBody}>
          <MenuList className={styles.menuList}>
            <MenuItem onClick={async () => await NavigateAway("/")}>
              Home
            </MenuItem>
            <MenuItem onClick={async () => await NavigateAway("/start-list")}>
              Start
            </MenuItem>
            <MenuItem
              onClick={async () => await NavigateAway("/delivery-dates")}
            >
              Maak lijstje
            </MenuItem>
            <MenuItem onClick={async () => await NavigateAway("/customers")}>
              Klanten
            </MenuItem>
          </MenuList>
          <div className={styles.version}>
            version: {import.meta.env.VITE_VERSION}
          </div>
        </DrawerBody>
      </Drawer>
      <div className={styles.mainSection}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </div>
    </div>
  )
}
