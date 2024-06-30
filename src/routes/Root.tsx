import { Outlet } from "react-router-dom"
import MainMenu from "../MainMenu"

export default function Root() {
  return (
    <MainMenu>
      <Outlet />
    </MainMenu>
  )
}
