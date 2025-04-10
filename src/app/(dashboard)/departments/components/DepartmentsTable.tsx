"use client"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { usePermission } from "@/hooks/use-permissions"
import { Department, DepartmentResponse } from "@/types/department"
import { DepartmentFormDialog } from "./DepartmentsFormDilalog"

type DepartmentTableProps = {
  departments: DepartmentResponse,
}

export default function DepartmentTable({
  departments
}: DepartmentTableProps) {

  const { canCreate, canUpdate, canDelete } = usePermission()
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedDepartment(null)
    setOpen(true)
  }

  const actions = useMemo(() => {
    const permittedActions = []

    if (canUpdate("Department")) {
      permittedActions.push({
        label: "Edit",
        onClick: handleEdit,
      })
    }

    if (canDelete("Department")) {
      permittedActions.push({
        label: "Delete",
        onClick: (department: Department) => console.log("Delete department", department),
      })
    }

    return permittedActions
  }, [canUpdate, canDelete])

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const department = row.original
        return <ActionsDropdown actions={actions} data={department} />
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
          canCreate("Department") && 
          <Button onClick={handleCreate}>Add Department</Button>
        }
      </div>

      <DataTable data={departments?.data.departments || []} total={departments?.data.total || 0} columns={columns} />

      <DepartmentFormDialog
        open={open}
        setOpen={setOpen}
        data={selectedDepartment}
      />
    </div>
  )
}

