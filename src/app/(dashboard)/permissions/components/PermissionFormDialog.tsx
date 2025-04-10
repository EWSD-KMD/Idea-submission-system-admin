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
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Permission } from "@/types/permission"
import { permissionFormSchema, PermissionType } from "@/schemas/permissionFormSchema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPermission, updatePermission } from "@/services/permission"
import { Menu } from "@/types/menu"

interface PermissionFormDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: Permission | null
  menus: Menu[]
}

const defaultValuesForCreate = () => {
  return {
    operation: "",
    menuId: 0,
  }
}

const defaultValueForEdit = (data: Permission) => {
  return {
    operation: data?.operation || "",
    menuId: data?.menuId || 0
  }
}

const actions = [
  {
    label: "CREATE",
    value: "CREATE",
  },
  {
    label: "UPDATE",
    value: "UPDATE",
  },
  {
    label: "READ",
    value: "READ",
  },
  {
    label: "DELETE",
    value: "DELETE"
  },
  {
    label: "EXPORT",
    value: "EXPORT"
  },
  {
    label: "DISABLE",
    value: "DISABLE"
  },
  {
    label: "FULLY_DISABLE",
    value: "FULLY_DISABLE"
  },
  {
    label: "ENABLE",
    value: "ENABLE"
  },
  {
    label: "HIDE",
    value: "HIDE"
  }
]

export function PermissionFormDialog({ open, setOpen, data, menus }: PermissionFormDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!data

  const form = useForm<PermissionType>({
    resolver: zodResolver(permissionFormSchema),
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

  const onSubmit = async (values: PermissionType) => {
    setIsLoading(true)

    try {
      const response = isEditMode ?
        await updatePermission(data!.id, values) : await createPermission(values)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: isEditMode ? "Permission updated successfully" : "Permission created successfully",
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
        description: error instanceof Error ? error.message : "Failed to process permission data",
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
          <DialogTitle>{isEditMode ? "Edit Role" : "Create Role"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the role information below." : "Fill in the details to create a new role."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="operation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ? field.value : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a operation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {actions.map((action) => (
                        <SelectItem key={action.value} value={action.value}>
                          {action.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="menuId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number.parseInt(value))}
                    value={field.value ? field.value.toString() : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a operation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {menus.map((menu) => (
                        <SelectItem key={menu.id} value={menu.id.toString()}>
                          {menu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

