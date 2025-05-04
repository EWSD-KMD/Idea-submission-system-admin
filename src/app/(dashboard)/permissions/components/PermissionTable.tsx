"use client";
import { useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import ActionsDropdown from "@/components/core/DropDownAction";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Permission, PermissionResponse } from "@/types/permission";
import { PermissionFormDialog } from "./PermissionFormDialog";
import { MenuResponse } from "@/types/menu";
import { deletePermission } from "@/services/permission";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type PermissionTableProps = {
  permissions: PermissionResponse;
  menus: MenuResponse;
};
export default function PermissionTable({
  permissions,
  menus,
}: PermissionTableProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const handleEdit = (role: Permission) => {
    setSelectedPermission(role);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedPermission(null);
    setOpen(true);
  };

  const handleDelete = async (data: Permission) => {
    const response = await deletePermission(data.id);
    if (response.message === "success") {
      toast({
        title: "Success",
        description: "Permission deleted successfully",
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
        return row.original.menu.name;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const role = row.original;
        return <ActionsDropdown actions={actions} data={role} />;
      },
      enableHiding: false,
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-end">

        <Button onClick={handleCreate}>Create Permission</Button>
      </div>

      <DataTable
        data={permissions?.data?.data || []}
        total={permissions?.data?.meta?.total || 0}
        columns={columns}
      />

      <PermissionFormDialog
        open={open}
        setOpen={setOpen}
        data={selectedPermission}
        menus={menus?.data?.data}
      />
    </div>
  );
}
