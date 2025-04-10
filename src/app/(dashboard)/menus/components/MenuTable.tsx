"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Menu, MenuResponse } from "@/types/menu"
import { MenuFormDIalog } from "./MenuFormDialog"

type MenuTableProps = {
  menus: MenuResponse,
}

export default function MenuTable({
  menus
}: MenuTableProps) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedMenu(null)
    setOpen(true)
  }

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: (menu: Menu) => console.log("Delete menu", menu),
    },
  ]

  const columns: ColumnDef<Menu>[] = [
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

        <Button onClick={handleCreate}>Create Menu</Button>
      </div>

      <DataTable data={menus?.data || []} total={menus?.total || 0} columns={columns} />

      <MenuFormDIalog
        open={open}
        setOpen={setOpen}
        data={selectedMenu}
      />
    </div>
  )
}

