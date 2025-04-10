import { getAllCategories } from "@/services/category"
import CategoryTable from "./components/CategoriesTable"


export default async function Page () {

  const categories = await getAllCategories()

  return (
    <CategoryTable categories={categories}/>
  )
}