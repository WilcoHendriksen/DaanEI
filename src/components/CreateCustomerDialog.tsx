import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Select,
  makeStyles
} from "@fluentui/react-components"
import { SubmitHandler, useForm } from "react-hook-form"

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
    flex: "1"
  }
})

export default function CreateCustomerDialog({
  open,
  setOpen,
  onSubmit,
  customerToEdit
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: SubmitHandler<Customer>
  customerToEdit?: Customer
}) {
  const { register, handleSubmit } = useForm<Customer>({
    values: customerToEdit
  })
  const styles = useStyles()
  return (
    <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Maak een klant</Button>
      </DialogTrigger>
      <DialogSurface style={{ height: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <DialogTitle>Maak klant</DialogTitle>
            <DialogContent className={styles.form}>
              <Field label="Naam">
                <Input {...register("name")} />
              </Field>
              <Field label="Adres">
                <Input {...register("address")} />
              </Field>
              <Field label="Telefoon nummer">
                <Input type="number" {...register("phoneNumber")} />
              </Field>
              <Field label="Standaard aantal eieren">
                <Input type="number" {...register("amount")} />
              </Field>
              <Field label="Standaard betaalmethode">
                <Select {...register("payment")}>
                  <option>tikkie</option>
                  <option>contant</option>
                </Select>
              </Field>
              <Field label="Favoriet">
                <Checkbox {...register("isFavorite")} />
              </Field>
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
