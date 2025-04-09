"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { DataTable } from "@/components/core/DataTable"
import ActionsDropdown from "@/components/core/DropDownAction"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Idea, IdeaResponse } from "@/types/idea"
import { usePermission } from "@/hooks/use-permissions"

type IdeaTableProps = {
  ideas: IdeaResponse,
}

export default function IdeaTable({
  ideas
}: IdeaTableProps) {
  // const { canCreate, canUpdate, canDelete } = usePermission()
  const [search, setSearch] = useState("")
  // const [open, setOpen] = useState(false)
  // const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  // const handleView = (idea: Idea) => {
  //   setSelectedIdea(idea)
  //   setOpen(true)
  // }

  const handleExport = () => {
    console.log('export')
  }

  const actions = [
    // {
    //   label: "View",
    //   onClick: handleView,
    // },
  ]

  const columns: ColumnDef<Idea>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const idea = row.original
        return <ActionsDropdown actions={actions} data={idea} />
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

        <Button onClick={handleExport}>Export Ideas</Button>
      </div>

      <DataTable data={ideas?.data?.ideas || []} total={ideas?.data?.total || 0} columns={columns} />
{/* 
      <MenuFormDIalog
        open={open}
        setOpen={setOpen}
        data={selectedMenu}
      /> */}
    </div>
  )
}

