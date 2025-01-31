import { Button, makeStyles } from "@fluentui/react-components"
import Loading from "../components/layout/Loading"
import EmptyState from "../components/layout/EmptyState"
import CreateCustomerDialog from "../components/CreateCustomerDialog"
import { SubmitHandler } from "react-hook-form"
import Customer from "../components/Customer"
import { useState } from "react"
import useCustomers from "../queries/useCustomers"
import { createCustomer, deleteCustomer } from "../repo/CustomerRepo"
import { useNavigate } from "react-router-dom"
import { ArrowLeftFilled } from "@fluentui/react-icons"

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
    position: "absolute",
    right: "16px",
    bottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }
})

export default function CustomerList() {
  const styles = useStyles()
  const [open, setOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState<Customer | undefined>(
    undefined
  )
  const { data, isLoading, refetch } = useCustomers()
  const navigate = useNavigate()
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
        {!isLoading && !data?.length && <EmptyState text="Geen klanten" />}
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
        <Button
          type="button"
          onClick={() => navigate("/home")}
          shape="circular"
          size="large"
          icon={<ArrowLeftFilled />}
        />
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
