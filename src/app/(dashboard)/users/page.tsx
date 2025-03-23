import { getAllUsers } from "@/services/user"
import UserTable from "./components/UserTable"
import { getAllDepartments } from "@/services/department"
import { getAllRoles } from "@/services/role"

export default async function Page () {

  const [users, departments, roles] = await Promise.all([
    getAllUsers(),
    getAllDepartments(),
    getAllRoles(),
  ])

  return (
    <UserTable users={users} departments={departments} roles={roles} />
  )
}