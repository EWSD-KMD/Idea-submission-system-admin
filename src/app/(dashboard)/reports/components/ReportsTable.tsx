"use client"

import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import type { Report, ReportResponse } from "@/types/report"
import { disableOrEnableUser, fullyDisableOrEnableUser } from "@/services/report"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { usePermission } from "@/hooks/use-permissions"

type ReportTableProps = {
  reports: ReportResponse
}

export default function ReportTable({ reports }: ReportTableProps) {

  const { canDisable, canFullyDisable } = usePermission()
  const router = useRouter()

  const handleDisableUser = async (report: Report) => {
    const currentStatus = report.idea.user.disabledInd
    const data = {
      disabledInd: !currentStatus,
    }

    try {
      const response = await disableOrEnableUser(report.idea.userId, data)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: currentStatus ? "User enabled successfully" : "User disabled successfully",
        })
        router .refresh()
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

  const handleFullyDisableUser = async (report: Report) => {
    const currentStatus = report.idea.user.fullyDisabledInd
 
    const data = {
      disabledInd: !currentStatus,
    }

    try {
      const response = await fullyDisableOrEnableUser(report.idea.userId, data)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: currentStatus ? "User fully enabled successfully" : "User fully disabled successfully",
        })

        router.refresh()
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

  const getActions = (report: Report) => {
    const isDisabled = report.idea.user.disabledInd
    const isFullyDisabled = report.idea.user.fullyDisabledInd
  
    const actions = []
  
    if (canDisable("Report")) {
      actions.push({
        label: isDisabled ? "Enable User" : "Disable User",
        onClick: () => handleDisableUser(report),
      })
    }
  
    if (canFullyDisable("Report")) {
      actions.push({
        label: isFullyDisabled ? "Fully Enable User": "Fully Disable User",
        onClick: () => handleFullyDisableUser(report),
      })
    }
  
    return actions
  }
  

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "idea.user",
      header: "Idea Owner",
      cell: ({ row }) => {
        const report = row.original
        return report.idea.user.name
      },
    },
    {
      accessorKey: "user",
      header: "Reported By",
      cell: ({ row }) => {
        const report = row.original
        return report.user.name
      },
    },
    {
      accessorKey: "idea.title",
      header: "Idea Title",
      cell: ({ row }) => {
        const report = row.original
        return report.idea.title
      },
    },
    {
      accessorKey: "idea.description",
      header: "Idea Description",
      cell: ({ row }) => {
        const report = row.original
        return report.idea.description
      },
    },
    {
      accessorKey: "isDisabled",
      header: "IsDisabled",
      cell: ({ row }) => {
        const report = row.original
        return report.idea.user.disabledInd?.toString()
      },
    },
    {
      accessorKey: "isFullyDisabled",
      header: "isFullyDisabled",
      cell: ({ row }) => {
        const report = row.original
        return report.idea.user.fullyDisabledInd?.toString()
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const report = row.original
        return <ActionsDropdown actions={getActions(report)} data={report} />
      },
      enableHiding: false,
    },
  ]

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-end">
      </div>

      <DataTable data={reports?.data?.data || []} total={reports?.data?.total || 0} columns={columns} />
    </div>
  )
}
