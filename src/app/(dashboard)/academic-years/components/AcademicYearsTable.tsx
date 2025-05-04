"use client";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/core/DataTable";
import ActionsDropdown from "@/components/core/DropDownAction";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AcademicYear, AcademicYearResponse } from "@/types/academic-year";
import { AcademicYearFormDialog } from "./AcademicYearsFormDIalog";
import { usePermission } from "@/hooks/use-permissions";
import { formatDate } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Star } from "lucide-react";
import {
  deleteAcademicYear,
  setCurrentAcademicYear,
} from "@/services/acedamic-year";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type AcadmicYearTableProps = {
  acadmicYears: AcademicYearResponse;
  currentYear: number;
};

export default function AcdemicYearTable({
  acadmicYears,
  currentYear,
}: AcadmicYearTableProps) {
  const router = useRouter();
  const { canCreate, canUpdate, canDelete } = usePermission();
  const [open, setOpen] = useState(false);
  const [selectedAcademicYear, setSlectedAcademicYear] =
    useState<AcademicYear | null>(null);

  const handleEdit = (data: AcademicYear) => {
    setSlectedAcademicYear(data);
    setOpen(true);
  };

  const handleCreate = () => {
    setSlectedAcademicYear(null);
    setOpen(true);
  };

  const handleDelete = async (data: AcademicYear) => {
    const response = await deleteAcademicYear(data.id);

    if (response.message === "success") {
      toast({
        title: "Success",
        description: "Academic Year deleted successfully",
      });
      router.refresh();
    }
  };

  const handleSetCurrentYear = async (yearId: string) => {
    try {
      const response = await setCurrentAcademicYear({
        currentAcademicYearId: Number(yearId),
      });

      if (response.message === "success") {
        toast({
          title: "Success",
          description: "Academic Year set successfully",
        });
        router.refresh();
      } else {
        throw new Error(response.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to process current Year data",
        variant: "destructive",
      });
    }
  };

  const actions = useMemo(() => {
    const permittedActions = [];

    if (canUpdate("AcademicYear")) {
      permittedActions.push({
        label: "Edit",
        onClick: handleEdit,
      });
    }

    if (canDelete("AcademicYear")) {
      permittedActions.push({
        label: "Delete",
        onClick: handleDelete,
      });
    }

    return permittedActions;
  }, [canUpdate, canDelete, handleEdit, handleDelete]);

  const columns: ColumnDef<AcademicYear>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => {
        const isCurrentYear = row.original.id === currentYear;
        return (
          <div className="flex items-center gap-2">
            {row.original.year}
            {isCurrentYear && (
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        return formatDate(row.original.startDate, "yyyy-MM-dd");
      },
    },
    {
      accessorKey: "closureDate",
      header: "Closure Date",
      cell: ({ row }) => {
        return formatDate(row.original.closureDate, "yyyy-MM-dd");
      },
    },
    {
      accessorKey: "finalClosureDate",
      header: "Final Closure Date",
      cell: ({ row }) => {
        return formatDate(row.original.finalClosureDate, "yyyy-MM-dd");
      },
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
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex gap-4 items-center">
          {canUpdate("AcademicYear") && (
            <div className="space-y-2">
              <Select
                value={currentYear.toString()}
                onValueChange={handleSetCurrentYear}
              >
                <SelectTrigger id="current-year" className="w-[200px]">
                  <SelectValue placeholder="Set Current Year" />
                </SelectTrigger>
                <SelectContent>
                  {acadmicYears?.data.data.map((year) => (
                    <SelectItem key={year.id} value={year.id.toString()}>
                      <div className="flex items-center gap-2">
                        {year.year}
                        {year.id === currentYear && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <p className="text-gray-600 text-sm">Current Academic Year</p>
        </div>

        {canCreate("AcademicYear") && (
          <Button onClick={handleCreate}>Add Year</Button>
        )}
      </div>

      <DataTable
        data={acadmicYears?.data.data || []}
        total={acadmicYears?.data.total || 0}
        columns={columns}
      />

      <AcademicYearFormDialog
        open={open}
        setOpen={setOpen}
        data={selectedAcademicYear}
      />
    </div>
  );
}
