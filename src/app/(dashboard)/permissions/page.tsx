import { getAllPermissions } from "@/services/permission"
import PermissionTable from "./components/PermissionTable"
import { getMenus } from "@/services/menu"

export default async function Page ({searchParams}:{searchParams: Promise<Record<string, string>>}) {

  const [permissions, menus] = await Promise.all([
    getAllPermissions(searchParams),
    getMenus()
  ])

  return (
    <PermissionTable permissions={permissions} menus={menus} />
  )
}