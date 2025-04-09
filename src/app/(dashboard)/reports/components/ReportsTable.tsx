"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import { Report, ReportResponse } from "@/types/report"
import { disableOrEnableUser } from "@/services/report"
import { toast } from "@/hooks/use-toast"

type ReportTableProps = {
  reports: ReportResponse,
}

export default function ReportTable({
  reports
}: ReportTableProps) {
  const [search, setSearch] = useState("")
  const [isDisable, setIsDisable] = useState(false)
  const [isFullyDisable, setIsFullyDisable] = useState(false)
  // const [open, setOpen] = useState(false)
  // const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // const handleView = (report: Report) => {
  //   setSelectedReport(report)
  //   setOpen(true)
  // }

  const handleDisableUser = async(report: Report) => {
    const data = {
      disabledInd: isDisable ? false : true
    }

    try {
      const response = await disableOrEnableUser(report.userId, data)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: response.data.message || "User disabled successfully"
        })
        setIsDisable(true)
      } else {
        throw new Error(response.message || "Operation failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process",
        variant: "destructive",
      })
    } 
  }

  const handleFullyDisableUser  = async(report: Report) => {

    const data = {
      disabledInd: isFullyDisable ? false : true
    }

    try {
      const response = await disableOrEnableUser(report.userId, data)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: response.data.message || "User fully disabled successfully"
        })
        setIsFullyDisable(true)
      } else {
        throw new Error(response.message || "Operation failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process",
        variant: "destructive",
      })
    } 
  }

  const actions = [
    // {
    //   label: "View",
    //   onClick: handleView,
    // },
    {
      label: isDisable ? "Enable User" : "Disable User",
      onClick: handleDisableUser,
    },
    {
      label: isFullyDisable ? "Enable User" : "Fully Disable User",
      onClick: handleFullyDisableUser,
    }
  ]

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "user",
      header: "User",
    },
    {
      accessorKey: "idea",
      header: "Idea",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "detail",
      header: "Detail",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const menu = row.original
        return <ActionsDropdown actions={actions} data={menu} />
      },
      enableHiding: false,
    },
  ]

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-between">
        <Input
          type="text"
          placeholder="Search ..."
          className="w-80"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />

      </div>

      <DataTable data={reports?.data?.data || []} total={reports?.data?.total || 0} columns={columns} />

    </div>
  )
}

