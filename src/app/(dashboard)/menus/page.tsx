import MenuTable from "./components/MenuTable"
import { getAllMenus } from "@/services/menu"

export default async function Page () {

  const menus = await getAllMenus()

  return (
    <MenuTable menus={menus}/>
  )
}