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
  onSubmit
}: {
  onSubmit: SubmitHandler<Customer>
}) {
  const { register, handleSubmit } = useForm<Customer>()
  const styles = useStyles()

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Voeg klant toe</Button>
      </DialogTrigger>
      <DialogSurface>
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
                <Input {...register("phoneNumber")} />
              </Field>
              <Field label="Aantal eieren">
                <Input {...register("amount")} />
              </Field>
              <Field label="Favoriet">
                <Checkbox {...register("isFavorite")} />
              </Field>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" type="button">
                  Sluit
                </Button>
              </DialogTrigger>
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
