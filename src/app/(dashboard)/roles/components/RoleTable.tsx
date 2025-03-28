"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { Role, RoleResponse } from "@/types/role"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { RoleFormDIalog } from "./RoleFormDialog"

export default function RoleTable({
  roles
}: { roles: RoleResponse }) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const handleEdit = (role: Role) => {
    setSelectedRole(role)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedRole(null)
    setOpen(true)
  }

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: (role: Role) => console.log("Delete role", role),
    },
  ]

  const columns: ColumnDef<Role>[] = [
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

        <Button onClick={handleCreate}>Create Role</Button>
      </div>

      <DataTable data={roles?.data.roles || []} total={roles?.data.total || 0} columns={columns} />

      <RoleFormDIalog
        open={open}
        setOpen={setOpen}
        roles={roles.data?.roles || []}
        data={selectedRole}
      />
    </div>
  )
}

