"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Permission, PermissionResponse } from "@/types/permission"
import { PermissionFormDialog } from "./PermissionFormDialog"
import { MenuResponse } from "@/types/menu"

type PermissionTableProps = {
  permissions: PermissionResponse,
  menus: MenuResponse
}
export default function PermissionTable({
  permissions,
  menus
}: PermissionTableProps) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)

  const handleEdit = (role: Permission) => {
    setSelectedPermission(role)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedPermission(null)
    setOpen(true)
  }

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: (permission: Permission) => console.log("Delete permission", permission),
    },
  ]

  const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "operation",
      header: "Operation",
    },
    {
      accessorKey: "menu",
      header: "Menu",
      cell: ({ row }) => {
       return row.original.menu.name
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const role = row.original
        return <ActionsDropdown actions={actions} data={role} />
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

        <Button onClick={handleCreate}>Create Permission</Button>
      </div>

      <DataTable data={permissions?.data || []} total={permissions?.total || 0} columns={columns} />

      <PermissionFormDialog
        open={open}
        setOpen={setOpen}
        data={selectedPermission}
        menus={menus?.data}
      />
    </div>
  )
}

