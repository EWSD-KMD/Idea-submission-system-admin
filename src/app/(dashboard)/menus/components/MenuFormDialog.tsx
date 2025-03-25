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
import { Menu } from "@/types/menu"
import { menuFormSchema, MenuType } from "@/schemas/menuFormSchema"
import { createMenu, updateMenu } from "@/services/menu"

interface MenuFormDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  menus: Menu[]
  data: Menu | null
}

const defaultValuesForCreate = () => {
  return {
    name: "",
    permissions: ""
  }
}

const defaultValueForEdit = (data: Menu) => {
  return {
    name: data?.name || "",
    permissions: data?.permissions || ""
  }
}

export function MenuFormDIalog({ open, setOpen, data }: MenuFormDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!data

  const form = useForm<MenuType>({
    resolver: zodResolver(menuFormSchema),
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

  const onSubmit = async (values: MenuType) => {
    setIsLoading(true)

    try {
      const response = isEditMode ? 
        await updateMenu(data!.id, values) : await createMenu(values)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: isEditMode ? "Menu updated successfully" : "Menu created successfully",
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
        description: error instanceof Error ? error.message : "Failed to process menu data",
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
          <DialogTitle>{isEditMode ? "Edit Menu" : "Create Menu"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the menu information below." : "Fill in the details to create a new menu."}
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

            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Permissions" {...field} />
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

