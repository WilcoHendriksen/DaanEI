import Loading from "../components/layout/Loading"
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
  makeStyles
} from "@fluentui/react-components"
import { SubmitHandler, useForm } from "react-hook-form"

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
    flex: "1",
    overflowY: "hidden"
  },
  selectList: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "auto"
  },
  customer: {
    height: "48px",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    overflowY: "auto"
  }
})

export default function CreateCustomerDialog({
  open,
  setOpen,
  onSubmit
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: SubmitHandler<Customer>
}) {
  const { register, handleSubmit } = useForm<Customer>()
  const styles = useStyles()
  const { isLoading, data } = useCustomers()

  return (
    <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogSurface style={{ height: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <DialogTitle>Maak klant</DialogTitle>
            <DialogContent className={styles.form}>
              <Field label="Aantal">
                <Input type="number" {...register("amount")} />
              </Field>
              {isLoading && <Loading />}
              <div className={styles.selectList}>
                {data?.map((c) => (
                  <div className={styles.customer}>
                    <p>{c.name}</p>
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
                <Button type="submit" appearance="primary">
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
