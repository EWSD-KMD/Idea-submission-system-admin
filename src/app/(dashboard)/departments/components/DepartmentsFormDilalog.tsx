"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Department } from "@/types/department"
import { departmentFormSchema, DepartmentType } from "@/schemas/departmentFormSchema"
import { createDepartment, updateDepartment } from "@/services/department"

interface DepartmentFormDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: Department | null
}

const defaultValuesForCreate = () => {
  return {
    name: "",
  }
}

const defaultValueForEdit = (data: Department) => {
  return {
    name: data?.name || "",
  }
}

export function DepartmentFormDialog({ open, setOpen, data }: DepartmentFormDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!data

  const form = useForm<DepartmentType>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: isEditMode
      ? defaultValueForEdit(data)
      : defaultValuesForCreate()
  })

  useEffect(() => {
    if (open) {
      if (data) {
        form.reset(defaultValueForEdit(data))
      } else {
        form.reset(defaultValuesForCreate())
      }
    }
  }, [data, open, form])

  const onSubmit = async (values: DepartmentType) => {
    setIsLoading(true)

    try {
      const response = isEditMode ? 
        await updateDepartment(data!.id, values) : await createDepartment(values)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: isEditMode ? "Department updated successfully" : "Department created successfully",
        })
        router.refresh() 
        setOpen(false)
      } else {
        throw new Error(response.message || "Operation failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process department data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Department" : "Create Department"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the department information below." : "Fill in the details to create a new department."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

