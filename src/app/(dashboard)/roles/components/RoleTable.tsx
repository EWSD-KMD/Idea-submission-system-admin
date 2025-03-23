"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import ActionsDropdown from "@/components/core/DropDownAction";
import { RoleFormDialog } from "./RoleFormDialog";
import { RoleResponse } from "@/types/role";

export function RoleTable({ data }: { data: RoleResponse }) {
  const [search, setSearch] = useState("");
  const [open , setOpen] = useState(false);

  const actions = [
    {
      label : "Edit",
      onClick: () => setOpen(true)
    },
    {
      label : "Delete",
      onClick: () => console.log("delete button")
    }, 
  ]


  const columns = [
    {
      accessorKey: "id",
      header: "RoleId"    
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: () => {
        return (
          <ActionsDropdown actions={actions}/>
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
        <RoleFormDialog open={open} setOpen={setOpen}/>
      </div>

      <DataTable
        data={data?.data.roles || []}
        total={data?.data.total || 0}
        columns={columns}
      />
    </div>
  );
};

