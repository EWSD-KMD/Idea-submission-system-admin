import { getAllReports } from "@/services/report"
import ReportTable from "./components/ReportsTable"

export default async function Page () {

  const reports = await getAllReports()

  return (
    <ReportTable reports={reports}/>
  )
}