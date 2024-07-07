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
import { AddFilled, ArrowLeftFilled, SaveRegular } from "@fluentui/react-icons"
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
        <Button shape="circular" size="large" icon={<AddFilled />} />
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
            </DialogContent>
            <DialogActions
              style={{ position: "absolute", right: "8px", bottom: "8px" }}
            >
              <Button
                appearance="secondary"
                shape="circular"
                size="large"
                type="button"
                icon={<ArrowLeftFilled />}
                onClick={() => setOpen(false)}
              />
              <DialogTrigger disableButtonEnhancement>
                <Button
                  shape="circular"
                  size="large"
                  type="submit"
                  icon={<SaveRegular />}
                />
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  )
}
