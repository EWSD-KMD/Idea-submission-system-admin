"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

// import { loginSchema, LoginType } from "@/schemas";

// import { useAuthSessionStore } from "@/store/useAuthSession";

// import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// import { useLogin } from "../queries";

export function ChangePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: ""
    },
    // resolver: zodResolver(loginSchema),
  });

  // const router = useRouter();
  // const { toast } = useToast();
  // const { setAuth } = useAuthSessionStore();
  // const { mutate, isPending } = useLogin();

  // const onSubmit = (data: LoginType) => {
  //   mutate(data, {
  //     onSuccess: (data) => {
  //       setAuth({
  //         accessToken: data.data.accessToken,
  //         user: data.data.data,
  //       });
  //       router.replace("/");
  //     },
  //     onError: () => {
  //       toast({
  //         title: "Login",
  //         description: "Login failed!",
  //         variant: "destructive",
  //       });
  //     },
  //   });
  // };

  const onSubmit = () => {
    console.log('success');
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-[90%] flex-col gap-6 md:max-w-md",
        className,
      )}
      {...props}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="email">Current Password</Label>
                <Input
                  id="email"
                  type="password"
                  {...register("currentPassword")}
                />
                {errors.currentPassword && (
                  <small className="text-red-500">Email is required!</small>
                )}
              </div>

              <div>
                <Label htmlFor="email">New Password</Label>
                <Input
                  id="email"
                  type="password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <small className="text-red-500">Email is required!</small>
                )}
              </div>

              <div>
                <Label htmlFor="email">Re-New Password</Label>
                <Input
                  id="email"
                  type="password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <small className="text-red-500">Email is required!</small>
                )}
              </div>

              <Button
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


