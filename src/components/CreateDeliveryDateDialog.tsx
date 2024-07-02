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
  Input
} from "@fluentui/react-components"
import { SubmitHandler, useForm } from "react-hook-form"

export default function CreateDeliveryDateDialog({
  open,
  setOpen,
  onSubmit
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onSubmit: SubmitHandler<DeliverDate>
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
                <Input type="date" {...register("date")} />
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
