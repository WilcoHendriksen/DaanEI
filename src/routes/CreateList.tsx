import {
  Button,
  Divider,
  Field,
  Input,
  makeStyles
} from "@fluentui/react-components"
import { SubmitHandler, useForm } from "react-hook-form"

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    flex: "1"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
    flex: "1"
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: "16px"
  }
})
export default function CreateList() {
  const styles = useStyles()
  const { register, handleSubmit } = useForm<Customer>()
  // const customers = localStorage.getItem("customers")

  const onSubmit: SubmitHandler<Customer> = (data: Customer) => {
    alert(JSON.stringify(data))
  }
  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Field label="Naam">
          <Input {...register("Name")} />
        </Field>
        <Field label="Adres">
          <Input {...register("Address")} />
        </Field>
        <Field label="Telefoon nummer">
          <Input {...register("PhoneNumber")} />
        </Field>
        <Button type="submit">add</Button>
      </form>
      <Divider>Text</Divider>
      <div>list</div>
      <div className={styles.buttonBar}>
        <Button>Add</Button>
        <Button>Clear</Button>
      </div>
    </div>
  )
}
