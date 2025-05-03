"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import ActionsDropdown from "@/components/core/DropDownAction";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Menu, MenuResponse } from "@/types/menu";
import { MenuFormDIalog } from "./MenuFormDialog";
import { deleteMenu } from "@/services/menu";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type MenuTableProps = {
  menus: MenuResponse;
};

export default function MenuTable({ menus }: MenuTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedMenu(null);
    setOpen(true);
  };

  const handleDelete = async (data: Menu) => {
    const response = await deleteMenu(data.id);
    if (response.message === "success") {
      toast({
        title: "Success",
        description: "Menu deleted successfully",
      });
      router.refresh();
    }
  };

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: handleDelete,
    },
  ];

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
        const menu = row.original;
        return <ActionsDropdown actions={actions} data={menu} />;
      },
      enableHiding: false,
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-end">

        <Button onClick={handleCreate}>Create Menu</Button>
      </div>

      <DataTable
        data={menus?.data || []}
        total={menus?.meta?.total || 0}
        columns={columns}
      />

      <MenuFormDIalog open={open} setOpen={setOpen} data={selectedMenu} />
    </div>
  );
}
