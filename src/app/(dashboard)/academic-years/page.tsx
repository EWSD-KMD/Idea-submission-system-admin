import { getAllAcademicYears, getCurrentAcademicYear } from "@/services/acedamic-year"
import AcdemicYearTable from "./components/AcademicYearsTable"

export default async function Page () {

  const [academicYears, currentYear] = await Promise.all([
    getAllAcademicYears(),
    getCurrentAcademicYear(),
  ])

  return (
    <AcdemicYearTable 
      acadmicYears={academicYears} 
      currentYear={currentYear?.data.masterSetting.currentAcademicYearId}
    />
  )
}