"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import ActionsDropdown from "@/components/core/DropDownAction";
import { UserFormDialog } from "./UserFormDialog";
import { UserResponse } from "@/types/user";
import { DepartmentResponse } from "@/types/department";
import { RoleResponse } from "@/types/role";

export default function UserTable({ users, departments, roles }: { users: UserResponse, departments: DepartmentResponse, roles: RoleResponse }) {

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("edit button")
    },
    {
      label: "Reset Password",
      onClick: () => console.log("reset button")
    },
    {
      label: "Delete",
      onClick: () => console.log("delete button")
    },
  ]

  const columns = [
    {
      accessorKey: "name",
      header: "Name"
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "roleId",
      header: "Role",
    },
    {
      accessorKey: "type",
      header: "User Type"
    },
    {
      id: "actions",
      enableHiding: false,
      cell: () => {
        return (
          <ActionsDropdown actions={actions} />
        )
      },
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-between">
        <Input
          type="text"
          placeholder="Search ..."
          className="w-80"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <UserFormDialog open={open} setOpen={setOpen} departments={departments?.data?.departments || []} roles={roles.data?.roles || []} />
      </div>

      <DataTable
        data={users?.data || []}
        total={users?.total || 0}
        columns={columns}
      />
    </div>
  );
};

