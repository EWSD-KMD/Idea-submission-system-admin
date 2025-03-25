import MenuTable from "./components/MenuTable"
import { getAllMenus } from "@/services/menu"

export default async function Page () {
  const data = await getAllMenus()

  return (
    <MenuTable menus={data} />
  )
}