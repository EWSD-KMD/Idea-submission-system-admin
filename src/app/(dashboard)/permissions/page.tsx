import { getAllPermissions } from "@/services/permission"
import PermissionTable from "./components/PermissionTable"
import { getAllMenus } from "@/services/menu"

export default async function Page () {

  const [permissions, menus] = await Promise.all([
    getAllPermissions(),
    getAllMenus()
  ])

  return (
    <PermissionTable permissions={permissions} menus={menus} />
  )
}