"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/app/(auth)/signin/server";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "../../components/icons/icons";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SigninTemplate({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [viewPassword, setViewPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setViewPassword(!viewPassword);
  };
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const formData = { email: data?.email, password: data?.password };
      const result = await login(formData);
      if (result?.error) {
        toast({
          title: `${result?.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div style={{ marginBottom: "20px" }}>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <div className="relative w-full">
              <Input
                id="password"
                type={viewPassword ? "text" : "password"}
                placeholder="Enter your password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters long",
                  },
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{ top: "10px", right: "10px" }}
                className="absolute text-gray-600"
              >
                {viewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
