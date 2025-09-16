import { Link } from "react-router-dom"
import Page from "../components/Page"

export default function NotFound() {
  return (
    <Page title="404">
      <p>That page doesn’t exist. <Link to="/" className="underline">Go home</Link>.</p>
    </Page>
  )
}
