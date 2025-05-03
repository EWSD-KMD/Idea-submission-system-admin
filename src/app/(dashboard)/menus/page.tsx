import MenuTable from "./components/MenuTable"
import { getAllMenus } from "@/services/menu"

export default async function Page ({searchParams}:{searchParams: Promise<Record<string, string>>}) {

  const menus = await getAllMenus(searchParams)

  return (
    <MenuTable menus={menus}/>
  )
}