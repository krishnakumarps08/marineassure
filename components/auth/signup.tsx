"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "../../components/icons/icons";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { signup } from "@/app/(auth)/signup/server";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupTemplate({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [viewPassword, setViewPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setViewPassword(!viewPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = { email: data?.email, password: data?.createPassword };
      const result = await signup(formData);
      if (result?.error) {
        toast({
          title: result?.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("", className)} {...props}>
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
              disabled={loading}
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Label className="sr-only" htmlFor="createPassword">
              Password
            </Label>
            <div className="relative w-full">
              <Input
                id="createPassword"
                type={viewPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("createPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters long",
                  },
                })}
                disabled={loading}
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
          <Button disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
