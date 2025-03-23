import { getAllRoles } from "@/services/role"
import { RoleTable } from "./components/RoleTable"

export default async function Page () {
  const data = await getAllRoles()

  return (
    <RoleTable data={data} />
  )
}