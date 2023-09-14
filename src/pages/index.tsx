import { logIn } from "@/helpers/auth/operations";
import LoginPage from "./login";

export default function Home() {
  return (
    <LoginPage logIn={logIn} />
  )
}
