import { redirect } from "next/navigation"

export default function adminIndex() {
  redirect("/admin/overview")
}
