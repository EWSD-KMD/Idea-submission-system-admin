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
import { categoryFormSchema, CategoryType } from "@/schemas/categoryFormSchema"
import { Category } from "@/types/category"
import { createCategory, updateCategory } from "@/services/category"


interface CategoryFormDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: Category | null
}

const defaultValuesForCreate = () => {
  return {
    name: "",
  }
}

const defaultValueForEdit = (data: Category) => {
  return {
    name: data?.name || "",
  }
}

export function CategoryFormDialog({ open, setOpen, data }: CategoryFormDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!data

  const form = useForm<CategoryType>({
    resolver: zodResolver(categoryFormSchema),
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

  const onSubmit = async (values: CategoryType) => {
    setIsLoading(true)

    try {
      const response = isEditMode ? 
        await updateCategory(data!.id, values) : await createCategory(values)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: isEditMode ? "Category updated successfully" : "Category created successfully",
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
          <DialogTitle>{isEditMode ? "Edit Category" : "Create Category"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the category information below." : "Fill in the details to create a new category."}
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

