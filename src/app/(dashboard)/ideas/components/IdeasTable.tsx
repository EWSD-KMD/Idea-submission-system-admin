"use client";
// import { useEffect, useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Idea, IdeaResponse } from "@/types/idea";
import { usePermission } from "@/hooks/use-permissions";
// import { getAllIdeas } from "@/services/idea";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function IdeaTable({ideas}: {ideas: IdeaResponse}) {
  const { canExport } = usePermission();
  // const [ideas, setIdeas] = useState<IdeaResponse | null>(null);

  // useEffect(() => {
  //   const fetchIdeas = async () => {
  //     const response = await getAllIdeas();
  //     setIdeas(response);
  //   };

  //   fetchIdeas();
  // }, []);

  const handleExport = () => {
    const url = `${BASE_URL}/api/admin/idea/export`;

    const a = document.createElement("a");
    a.href = url;
    a.download = "ideas_export.zip";
    a.click();
  };

  const columns: ColumnDef<Idea>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "likes",
      header: "Likes",
    },
    {
      accessorKey: "dislikes",
      header: "Dislikes",
    },
    {
      accessorKey: "views",
      header: "Views",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const idea = row.original;
        return idea.category.name;
      },
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => {
        const idea = row.original;
        return idea.department.name;
      },
    },
    {
      accessorKey: "academicYear",
      header: "Academic Year",
      cell: ({ row }) => {
        const idea = row.original;
        return idea.academicYear.year;
      },
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const idea = row.original;
        return idea.user.name;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-end">

        {canExport("Idea") && (
          <Button onClick={handleExport}>Export Ideas</Button>
        )}
      </div>

      <DataTable
        data={ideas?.data?.ideas || []}
        total={ideas?.data?.total || 0}
        columns={columns}
      />
    </div>
  );
}
