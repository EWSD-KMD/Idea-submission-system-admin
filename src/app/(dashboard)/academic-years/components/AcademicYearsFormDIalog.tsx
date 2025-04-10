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
import type { AcademicYear } from "@/types/academic-year"
import { type AcademicYearType, acedamicYearFormSchema } from "@/schemas/academicYearFormSchema"
import { createAcademicYear, updateAcademicYear } from "@/services/acedamic-year"
import { DatePicker } from "@/components/core/DatePicker"

interface AcademicYearsFormDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data: AcademicYear | null
}

const defaultValuesForCreate = () => {
  return {
    year: 2023,
    startDate: "",
    closureDate: "",
    finalClosureDate: "",
  }
}

const defaultValueForEdit = (data: AcademicYear) => {
  return {
    year: data?.year || 2023,
    startDate: data?.startDate || "",
    closureDate: data?.closureDate || "",
    finalClosureDate: data?.finalClosureDate || "",
  }
}

export function AcademicYearFormDialog({ open, setOpen, data }: AcademicYearsFormDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!data

  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [closureDate, setClosureDate] = useState<Date | undefined>(undefined)
  const [finalClosureDate, setFinalClosureDate] = useState<Date | undefined>(undefined)

  const form = useForm<AcademicYearType>({
    resolver: zodResolver(acedamicYearFormSchema),
    defaultValues: isEditMode ? defaultValueForEdit(data) : defaultValuesForCreate(),
  })

  useEffect(() => {
    if (open) {
      if (data) {
        form.reset(defaultValueForEdit(data))

        if (data.startDate) setStartDate(new Date(data.startDate))
        if (data.closureDate) setClosureDate(new Date(data.closureDate))
        if (data.finalClosureDate) setFinalClosureDate(new Date(data.finalClosureDate))
      } else {
        form.reset(defaultValuesForCreate())

        setStartDate(undefined)
        setClosureDate(undefined)
        setFinalClosureDate(undefined)
      }
    }
  }, [data, open, form])

  useEffect(() => {
    if (startDate) {
      form.setValue("startDate", startDate.toISOString(), { shouldValidate: true })
    }
  }, [startDate, form])

  useEffect(() => {
    if (closureDate) {
      form.setValue("closureDate", closureDate.toISOString(), { shouldValidate: true })
    }
  }, [closureDate, form])

  useEffect(() => {
    if (finalClosureDate) {
      form.setValue("finalClosureDate", finalClosureDate.toISOString(), { shouldValidate: true })
    }
  }, [finalClosureDate, form])

  const onSubmit = async (values: AcademicYearType) => {
    setIsLoading(true)

    console.log("values", values)

    try {
      const response = isEditMode ? await updateAcademicYear(data!.id, values) : await createAcademicYear(values)

      if (response.message === "success") {
        toast({
          title: "Success",
          description: isEditMode ? "Academic Year updated successfully" : "Academic Year created successfully",
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
        description: error instanceof Error ? error.message : "Failed to process Academic Year data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Academic Year" : "Create Academic Year"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the academic year information below."
              : "Fill in the details to create a new academic year."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2023"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <DatePicker date={startDate} setDate={setStartDate} placeholder="Select start date" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="closureDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Closure Date</FormLabel>
                  <DatePicker date={closureDate} setDate={setClosureDate} placeholder="Select closure date" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finalClosureDate"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Final Closure Date</FormLabel>
                  <DatePicker
                    date={finalClosureDate}
                    setDate={setFinalClosureDate}
                    placeholder="Select final closure date"
                  />
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

