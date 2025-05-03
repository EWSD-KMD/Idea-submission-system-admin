import { getAllPermissions } from "@/services/permission"
import PermissionTable from "./components/PermissionTable"
import { getAllMenus } from "@/services/menu"

export default async function Page ({searchParams}:{searchParams: Promise<Record<string, string>>}) {

  const [permissions, menus] = await Promise.all([
    getAllPermissions(searchParams),
    getAllMenus(searchParams)
  ])

  return (
    <PermissionTable permissions={permissions} menus={menus} />
  )
}