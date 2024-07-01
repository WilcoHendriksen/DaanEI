import { useParams, Link } from "react-router-dom"

export default function DeliverList() {
  let params = useParams()

  return (
    <>
      {params.date}
      <Link to="/delivery-dates">back</Link>
    </>
  )
}
