import { makeStyles } from "@fluentui/react-components"
import { useQuery } from "@tanstack/react-query"
import { createCustomer, readCustomers } from "../repo/IDBRepo"
import Loading from "../components/layout/Loading"
import NoCustomers from "../components/layout/NoCustomers"
import CreateCustomerDialog from "../components/CreateCustomerDialog"
import { SubmitHandler } from "react-hook-form"
import Customer from "../components/Customer"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flex: "1",
    flexDirection: "column"
  },
  customerList: {
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

export default function CustomerList() {
  const styles = useStyles()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => await readCustomers()
  })

  const onSubmit: SubmitHandler<Customer> = async (data: Customer) => {
    await createCustomer(data)
    await refetch()
  }

  const customersToRender = data?.sort((a, b) => a.name.localeCompare(b.name))
  return (
    <div className={styles.page}>
      <div className={styles.customerList}>
        {isLoading && <Loading />}
        {!isLoading && !data && <NoCustomers />}
        {!isLoading &&
          data &&
          customersToRender?.map((c) => <Customer key={c.name} customer={c} />)}
      </div>

      <div className={styles.buttonBar}>
        <CreateCustomerDialog onSubmit={onSubmit} />
      </div>
    </div>
  )
}
