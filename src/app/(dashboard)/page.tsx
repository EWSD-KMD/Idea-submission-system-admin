"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";


const data = {
  data: [
    {
      id: 1,
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      id: 1,
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    },
    {
      name: "Aung Ba",
      department: "Department 1",
      email: "aungba@gmail.com",
      role: "admin"
    }

  ],
  total: 20
}

const Page = () => {
  const [search, setSearch] = useState("");


  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="capitalize">{row.original?.name}</div>,
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },

    {
      id: "actions",
      header: () => <div className="ml-[10px]">Actions</div>,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        );
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

        <Button asChild>
          <Link href="/login">Create New</Link>
        </Button>
      </div>

      <DataTable
        data={data?.data || []}
        total={data?.total || 0}
        columns={columns}
      />
    </div>
  );
};

export default Page;
