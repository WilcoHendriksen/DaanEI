import { makeStyles } from "@fluentui/react-components"
import Loading from "../components/layout/Loading"
import NoCustomers from "../components/layout/NoCustomers"
import CreateCustomerDialog from "../components/CreateCustomerDialog"
import { SubmitHandler } from "react-hook-form"
import Customer from "../components/Customer"
import { useState } from "react"
import useCustomers from "../queries/useCustomers"
import { createCustomer, deleteCustomer } from "../repo/CustomerRepo"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "hidden"
  },
  customerList: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "auto"
  },
  buttonBar: {
    display: "flex",
    flex: "none",
    flexDirection: "row-reverse",
    padding: "16px",
    borderTop: "1px solid var(--colorNeutralBackground1Selected)"
  }
})

export default function CustomerList() {
  const styles = useStyles()
  const [open, setOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<Customer | undefined>(
    undefined
  )
  const { data, isLoading, refetch } = useCustomers()

  const onSubmit: SubmitHandler<Customer> = async (data: Customer) => {
    if (customerToEdit) await deleteCustomer(customerToEdit.name)
    setCustomerToEdit(undefined)
    await createCustomer(data)
    await refetch()
  }

  const onDeleteCustomer = async (customerName: string) => {
    await deleteCustomer(customerName)
    await refetch()
  }

  const onEditCustomer = async (customer: Customer) => {
    setCustomerToEdit(customer)
    setOpen(true)
  }

  const customersToRender = data?.sort((a: Customer, b: Customer) =>
    a.name.localeCompare(b.name)
  )
  return (
    <div className={styles.page}>
      <div className={styles.customerList}>
        {isLoading && <Loading />}
        {!isLoading && !data && <NoCustomers />}
        {!isLoading &&
          data &&
          customersToRender?.map((c: Customer) => (
            <Customer
              key={c.name}
              customer={c}
              onDelete={() => onDeleteCustomer(c.name)}
              onEdit={() => onEditCustomer(c)}
            />
          ))}
      </div>

      <div className={styles.buttonBar}>
        <CreateCustomerDialog
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmit}
          customerToEdit={customerToEdit}
        />
      </div>
    </div>
  )
}
