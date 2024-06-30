import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field
} from "@fluentui/react-components"
import { DatePicker } from "@fluentui/react-datepicker-compat"
import { SubmitHandler, useForm } from "react-hook-form"

export default function SelectDeliveryDateDialog({
  open,
  setOpen,
  onSubmit
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: SubmitHandler<{ date: string }>
}) {
  const { register, handleSubmit } = useForm<{ date: string }>()
  return (
    <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
      <DialogSurface style={{ height: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody>
            <DialogTitle>Selecteer een datum</DialogTitle>
            <DialogContent>
              <Field label="Datum">
                <DatePicker {...register("date")} />
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
