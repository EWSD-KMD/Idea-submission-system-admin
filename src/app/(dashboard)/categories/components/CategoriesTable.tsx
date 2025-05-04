"use client";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import ActionsDropdown from "@/components/core/DropDownAction";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Category, CategoryResponse } from "@/types/category";
import { CategoryFormDialog } from "./CategoriesFormDialog";
import { usePermission } from "@/hooks/use-permissions";
import { deleteCategory } from "@/services/category";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type CategoryTableProps = {
  categories: CategoryResponse;
};

export default function CategoryTable({ categories }: CategoryTableProps) {
  const { canCreate, canUpdate, canDelete } = usePermission();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setOpen(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = async (data: Category) => {
    try {
      const response = await deleteCategory(data.id);

      if (response.message === "success") {
        toast({
          title: "Success",
          description: "Category deleted successfully",
        });
        router.refresh();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Cannot delete category";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const actions = useMemo(() => {
    const permittedActions = [];

    if (canUpdate("Categories")) {
      permittedActions.push({
        label: "Edit",
        onClick: handleEdit,
      });
    }

    if (canDelete("Categories")) {
      permittedActions.push({
        label: "Delete",
        onClick: handleDelete,
      });
    }

    return permittedActions;
  }, [canUpdate, canDelete, handleDelete]);

  const columns: ColumnDef<Category>[] = [
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
        const category = row.original;
        return <ActionsDropdown actions={actions} data={category} />;
      },
      enableHiding: false,
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-row gap-2 justify-end">

        {canCreate("Categories") && (
          <Button onClick={handleCreate}>Add Category</Button>
        )}
      </div>

      <DataTable
        data={categories?.data.categories || []}
        total={categories?.data.total || 0}
        columns={columns}
      />

      <CategoryFormDialog
        open={open}
        setOpen={setOpen}
        data={selectedCategory}
      />
    </div>
  );
}
