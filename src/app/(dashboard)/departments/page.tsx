import { getAllDepartments } from "@/services/department"
import DepartmentTable from "./components/DepartmentsTable"

export default async function Page () {

  const departments = await getAllDepartments()

  return (
    <DepartmentTable departments={departments}/>
  )
}