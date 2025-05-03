import { getAllUsers } from "@/services/user"
import UserTable from "./components/UserTable"
import { getAllDepartments } from "@/services/department"
import { getAllRoles } from "@/services/role"

export default async function Page ({searchParams}:{searchParams: Promise<Record<string, string>>} ){

  const [users, departments, roles] = await Promise.all([
    getAllUsers(searchParams),
    getAllDepartments(),
    getAllRoles(),
  ])

  return (
    <UserTable users={users} departments={departments} roles={roles} />
  )
}