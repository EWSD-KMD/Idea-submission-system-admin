"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createRole, updateRole } from "@/services/role"

// Enums from the schema
enum Operation {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

// Types based on the provided data structure
interface Menu {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

interface Role {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

interface RolePermission {
  id: number
  roleId: number
  permissionId: number
  role: Role
}

interface Permission {
  id: number
  operation: Operation
  menuId: number
  menu: Menu
  rolePermissions: RolePermission[]
}

interface RoleManagementFormProps{
  permissions: Permission[]
}

const extractRoles = (permissions: Permission[]): Role[] => {
  const roleMap = new Map<number, Role>()

  permissions.forEach((permission) => {
    permission.rolePermissions.forEach((rp) => {
      if (!roleMap.has(rp.role.id)) {
        roleMap.set(rp.role.id, rp.role)
      }
    })
  })

  return Array.from(roleMap.values())
}

const getRolePermissions = (roleId: number, permissions: Permission[]): number[] => {
  const permissionIds: number[] = []

  permissions.forEach((permission) => {
    permission.rolePermissions.forEach((rp) => {
      if (rp.roleId === roleId) {
        permissionIds.push(permission.id)
      }
    })
  })

  return permissionIds
}

const groupPermissionsByMenu = (
  permissions: Permission[],
): {
  id: number
  name: string
  permissions: { id: number; operation: Operation }[]
}[] => {
  const menuMap = new Map<
    number,
    {
      id: number
      name: string
      permissions: { id: number; operation: Operation }[]
    }
  >()

  permissions.forEach((permission) => {
    const menuId = permission.menu.id
    if (!menuMap.has(menuId)) {
      menuMap.set(menuId, {
        id: menuId,
        name: permission.menu.name,
        permissions: [],
      })
    }

    menuMap.get(menuId)?.permissions.push({
      id: permission.id,
      operation: permission.operation,
    })
  })

  return Array.from(menuMap.values())
}

// Form schema
const RoleFormSchema = z.object({
  name: z.string().min(2, { message: "Role name must be at least 2 characters." }),
  permissionIds: z.array(z.number()),
})

export default function RoleManagementForm({permissions}: RoleManagementFormProps) {

  const router = useRouter()
  const roles = extractRoles(permissions)
  const menuData = groupPermissionsByMenu(permissions)
  const [isLoading, setIsLoading] = useState(false)
  const [activeRole, setActiveRole] = useState<number | null>(null)

  const form = useForm<z.infer<typeof RoleFormSchema>>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      name: "",
      permissionIds: [],
    },
  })

  const loadRoleData = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId)
    if (!role) return

    form.reset({
      name: role.name,
      permissionIds: getRolePermissions(role.id, permissions),
    })
    setActiveRole(role.id)
  }

  const createNewRole = () => {
    form.reset({
      name: "",
      permissionIds: [],
    })
    setActiveRole(null)
  }

  // Handle form submission
  async function onSubmit(data: z.infer<typeof RoleFormSchema>) {
    const payload = {
      id: activeRole || undefined, 
      name: data.name,
      permissionIds: data.permissionIds,
    }

    // Log the JSON payload that would be sent to the server
    console.log("Form submission payload:", JSON.stringify(payload, null, 2))

    setIsLoading(true)

    try {
      const response = activeRole ?
        await updateRole(activeRole, payload) : await createRole(payload)

      if (response.message === "success") {
        toast({
          title: activeRole ? "Role Updated" : "Role Created",
          description: `Role "${data.name}" with ${data.permissionIds.length} permissions would be sent to the server.`,
        })
        router.refresh()
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

  // Check if all permissions for a menu are selected
  const areAllMenuPermissionsSelected = (menuId: number) => {
    const menuPermissions = permissions.filter((p) => p.menuId === menuId)
    return menuPermissions.every((p) => form.watch("permissionIds").includes(p.id))
  }

  // Toggle all permissions for a menu
  const toggleMenuPermissions = (menuId: number, checked: boolean) => {
    const menuPermissions = permissions.filter((p) => p.menuId === menuId)
    const currentPermissions = form.watch("permissionIds")

    if (checked) {
      // Add all menu permissions
      const newPermissions = [...currentPermissions]
      menuPermissions.forEach((p) => {
        if (!newPermissions.includes(p.id)) {
          newPermissions.push(p.id)
        }
      })
      form.setValue("permissionIds", newPermissions)
    } else {
      // Remove all menu permissions
      form.setValue(
        "permissionIds",
        currentPermissions.filter((id) => !menuPermissions.some((p) => p.id === id)),
      )
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <Button onClick={createNewRole}>Create New Role</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Role selection sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Select a role to edit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map((role) => (
                <Button
                  key={role.id}
                  variant={activeRole === role.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => loadRoleData(role.id)}
                >
                  {role.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role form */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>
              {activeRole ? `Edit Role: ${roles.find((r) => r.id === activeRole)?.name}` : "Create New Role"}
            </CardTitle>
            <CardDescription>Configure role permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter role name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Tabs defaultValue="permissions" className="w-full">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="permissions" className="space-y-4">
                    {menuData.map((menu) => (
                      <Card key={menu.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{menu.name}</CardTitle>
                            <FormField
                              control={form.control}
                              name="permissionIds"
                              render={() => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      {...(!areAllMenuPermissionsSelected(menu.id) &&
                                      menu.permissions.some((p) => form.watch("permissionIds").includes(p.id))
                                        ? { indeterminate: "true" }
                                        : {})}
                                      onCheckedChange={(checked) => {
                                        toggleMenuPermissions(menu.id, checked === true)
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium">Select All</FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {menu.permissions.map((permission) => (
                              <FormField
                                key={permission.id}
                                control={form.control}
                                name="permissionIds"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                          const updatedPermissions = checked
                                            ? [...field.value, permission.id]
                                            : field.value.filter((value) => value !== permission.id)

                                          form.setValue("permissionIds", updatedPermissions)
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal capitalize">
                                      {menu.name} - {permission.operation}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>{activeRole ? "Update Role" : "Create Role"}</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

