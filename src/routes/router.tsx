import { createBrowserRouter } from "react-router-dom"
import Root from "./Root"
import StartList from "./StartList"
import DeliveryDates from "./DeliveryDates"
import CustomerList from "./CustomerList"

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
          path: "delivery-dates",
          element: <DeliveryDates />
        },
        {
          path: "start-list",
          element: <StartList />
        },
        {
          path: "customers",
          element: <CustomerList />
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
