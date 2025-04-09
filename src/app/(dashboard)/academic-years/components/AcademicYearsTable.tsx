"use client"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { AcademicYear, AcademicYearResponse } from "@/types/academic-year"
import { AcademicYearFormDialog } from "./AcademicYearsFormDIalog"
import { usePermission } from "@/hooks/use-permissions"
import { formatDate } from "date-fns"

type AcadmicYearTableProps = {
  acadmicYears: AcademicYearResponse,
}

export default function AcdemicYearTable({
  acadmicYears
}: AcadmicYearTableProps) {
  const { canCreate, canUpdate, canDelete } = usePermission()
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedAcademicYear, setSlectedAcademicYear] = useState<AcademicYear | null>(null)

  const handleEdit = (data: AcademicYear) => {
    setSlectedAcademicYear(data)
    setOpen(true)
  }

  const handleCreate = () => {
    setSlectedAcademicYear(null)
    setOpen(true)
  }

  const actions = useMemo(() => {
    const permittedActions = []

    if (canUpdate("AcademicYear")) {
      permittedActions.push({
        label: "Edit",
        onClick: handleEdit,
      })
    }

    if (canDelete("AcademicYear")) {
      permittedActions.push({
        label: "Delete",
        onClick: (data: AcademicYear) => console.log("Delete category", data),
      })
    }

    return permittedActions
  }, [canUpdate, canDelete])

  const columns: ColumnDef<AcademicYear>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        return formatDate(row.original.startDate, "yyyy-MM-dd")
      },
    },
    {
      accessorKey: "closureDate",
      header: "Closure Date",
      cell: ({ row }) => {
        return formatDate(row.original.startDate, "yyyy-MM-dd")
      },
    },
    {
      accessorKey: "finalClosureDate",
      header: "Final Closure Date",
      cell: ({ row }) => {
        return formatDate(row.original.startDate, "yyyy-MM-dd")
      },
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

        {
          canCreate("AcademicYear") &&
          <Button onClick={handleCreate}>Add Year</Button>
        }      
      </div>

      <DataTable data={acadmicYears?.data.data || []} total={acadmicYears?.data.total || 0} columns={columns} />

      <AcademicYearFormDialog
        open={open}
        setOpen={setOpen}
        data={selectedAcademicYear}
      />
    </div>
  )
}

