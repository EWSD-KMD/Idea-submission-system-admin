import { getAllAcademicYears } from "@/services/acedamic-year"
import AcdemicYearTable from "./components/AcademicYearsTable"


export default async function Page () {

  const academicYears = await getAllAcademicYears()

  return (
    <AcdemicYearTable acadmicYears={academicYears} />
  )
}