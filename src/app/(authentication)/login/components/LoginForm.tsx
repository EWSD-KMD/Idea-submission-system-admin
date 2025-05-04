"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { loginSchema, LoginType } from "@/schemas/loginSchema";
import { userLogin } from "@/services/auth";
import { useAuth } from "@/components/core/AuthProvider";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { LoginResponse } from "@/types/login";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      source: "ADMIN",
    },
    resolver: zodResolver(loginSchema),
  });

  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginType) => {
    console.log("data", data);
    setIsLoading(true);
    const response: LoginResponse = await userLogin(data);
    if (response.message === "success") {
      setIsLoading(false);
      login(response.data);
      toast({
        title: "Login Success",
        description: `${response.message}` || "Login Success!",
        variant: "default",
      });
    } else {
      setIsLoading(false);
      toast({
        title: "Login failed",
        description: `${response.message}` || "Login failed!",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-[90%] flex-col gap-6 md:max-w-md",
        className
      )}
      {...props}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <small className="text-red-500">Email is required!</small>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <small className="text-red-500">Password is required!</small>
                )}
              </div>

              {/* <div>
                <a
                  href="/forgot-password"
                  className="ml-auto mt-2 inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div> */}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
