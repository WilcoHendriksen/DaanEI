import { useState } from "react"
import Loading from "./layout/Loading"
import useCustomers from "../queries/useCustomers"
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  makeStyles,
  mergeClasses
} from "@fluentui/react-components"
import EmptyState from "@/components/layout/EmptyState"

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
    flex: "1",
    overflowY: "auto"
  },
  selectList: {
    display: "flex",
    flex: "1",
    flexDirection: "column"
  },
  customer: {
    height: "48px",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "auto",
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "16px",
    "&:hover": {
      backgroundColor: "darkgrey"
    }
  },
  isSelected: {
    backgroundColor: "darkslategrey"
  }
})

export default function AddOrderDialog({
  open,
  setOpen,
  onSave
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onSave: (customer: Customer, amount: number) => Promise<void>
}) {
  const styles = useStyles()
  const { isLoading, data } = useCustomers()
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined)
  const [amount, setAmount] = useState(0)

  const onCustomerClick = (customer: Customer) => {
    setAmount(customer.amount)
    setSelectedCustomer(customer)
  }

  const onAmountChange = (amount: number) => {
    setAmount(amount)
  }

  const onSaveOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSave(selectedCustomer!, amount)
  }

  return (
    <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogSurface
        style={{ height: "100%", margin: "0px", maxWidth: "unset" }}
      >
        <form onSubmit={(e) => onSaveOrder(e)}>
          <DialogBody>
            <DialogTitle>Voeg een order toe</DialogTitle>
            <DialogContent className={styles.form}>
              <Field label="Aantal">
                <Input
                  type="number"
                  value={amount.toString()}
                  onChange={(e) => onAmountChange(parseInt(e.target.value))}
                />
              </Field>
              <div className={styles.selectList}>
                {isLoading && <Loading />}
                {!isLoading && !data?.length && (
                  <EmptyState text="Voeg eerst een klant toe" />
                )}
                {!isLoading &&
                  data?.map((c) => (
                    <div
                      key={c.name}
                      className={mergeClasses(
                        styles.customer,
                        selectedCustomer?.name === c.name && styles.isSelected
                      )}
                      onClick={() => onCustomerClick(c)}
                    >
                      <p style={{ margin: "0px" }}>{c.name}</p>
                    </div>
                  ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="secondary"
                type="button"
                onClick={() => setOpen(false)}
              >
                Sluit
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  type="submit"
                  appearance="primary"
                  disabled={selectedCustomer === undefined || amount < 1}
                >
                  Voeg toe
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  )
}
