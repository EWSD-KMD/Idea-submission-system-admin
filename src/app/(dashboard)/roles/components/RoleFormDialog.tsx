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
import type { Role } from "@/types/role"
import { roleFormSchema, RoleType } from "@/schemas/roleFormSchema"
import { createRole, updateRole } from "@/services/role"

interface UserFormDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  roles: Role[]
  data: Role | null
}

const defaultValuesForCreate = () => {
  return {
    name: ""
  }
}

const defaultValueForEdit = (data: Role) => {
  return {
    name: data?.name || ""
  }
}

export function RoleFormDIalog({ open, setOpen, data }: UserFormDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!data

  const form = useForm<RoleType>({
    resolver: zodResolver(roleFormSchema),
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

  const onSubmit = async (values: RoleType) => {
    setIsLoading(true)

    try {
      const response = isEditMode ? 
        await updateRole(data!.id, values) : await createRole(values)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: isEditMode ? "Role updated successfully" : "Role created successfully",
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
        description: error instanceof Error ? error.message : "Failed to process role data",
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

