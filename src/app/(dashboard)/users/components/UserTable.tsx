"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import { UserFormDialog } from "./UserFormDialog"
import type { User, UserResponse } from "@/types/user"
import type { DepartmentResponse } from "@/types/department"
import type { RoleResponse } from "@/types/role"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export default function UserTable({
  users,
  departments,
  roles,
}: { users: UserResponse; departments: DepartmentResponse; roles: RoleResponse }) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedUser(null)
    setOpen(true)
  }

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Reset Password",
      onClick: (user: User) => console.log("Reset password for", user),
    },
    {
      label: "Delete",
      onClick: (user: User) => console.log("Delete user", user),
    },
  ]

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "roleId",
      header: "Role",
      cell: ({ row }) => {
        const roleId = row.original.roleId
        const role = roles.data?.roles.find((r) => r.id === roleId)
        return role?.name || roleId
      },
    },
    {
      accessorKey: "type",
      header: "User Type",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original
        return <ActionsDropdown actions={actions} data={user} />
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

        <Button onClick={handleCreate}>Create User</Button>
      </div>

      <DataTable data={users?.data || []} total={users?.total || 0} columns={columns} />

      <UserFormDialog
        open={open}
        setOpen={setOpen}
        departments={departments?.data?.departments || []}
        roles={roles.data?.roles || []}
        data={selectedUser}
      />
    </div>
  )
}

