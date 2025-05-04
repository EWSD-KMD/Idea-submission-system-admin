import RoleManagementForm from "./components/RoleForm"
import {  getPermissions } from "@/services/permission"

export default async function Page () {
  
  const permissions = await getPermissions()

  return (
    <div className="ml-6">
      <RoleManagementForm permissions={permissions?.data?.data}/>  
    </div>
  )
}