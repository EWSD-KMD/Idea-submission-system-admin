"use client";
import { Input } from "@/components/ui/input";
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
  const [search, setSearch] = useState("");
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

  const handleDelete = async (data: Category) => {
    const response = await deleteCategory(data.id);

    if (response.message === "success") {
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
      router.refresh();
    }
  };

  const actions = useMemo(() => {
    const permittedActions = [];

    if (canUpdate("Category")) {
      permittedActions.push({
        label: "Edit",
        onClick: handleEdit,
      });
    }

    if (canDelete("Category")) {
      permittedActions.push({
        label: "Delete",
        onClick: handleDelete,
      });
    }

    return permittedActions;
  }, [canUpdate, canDelete]);

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

        {canCreate("Category") && (
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
