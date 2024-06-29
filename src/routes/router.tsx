import { createBrowserRouter } from "react-router-dom"
import Root from "./Route"
import StartList from "./StartList"
import CreateList from "./CreateList"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <div>home</div>
        },
        {
          path: "create-list",
          element: <CreateList />
        },
        {
          path: "start-list",
          element: <StartList />
        }
      ]
    }
  ],
  {
    // I added these here to be compatible with react router v7 in the future
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true
    }
  }
)
