import RoleManagementForm from "./components/RoleForm"
import { getAllPermissions } from "@/services/permission"

export default async function Page () {
  
  const permissions = await getAllPermissions()

  return (
    <div className="ml-6">
      <RoleManagementForm permissions={permissions?.data}/>  
    </div>
  )
}