import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router.tsx"
import { FluentProvider, webDarkTheme } from "@fluentui/react-components"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webDarkTheme}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </FluentProvider>
  </React.StrictMode>
)
