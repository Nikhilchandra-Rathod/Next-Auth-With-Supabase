"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, {
        message: "Username is required",
      })
      .max(100, {
        message: "Username must have less than 100 characters",
      }),
    email: z
      .string()
      .min(2, {
        message: "Email is required",
      })
      .email({
        message: "Invalid email",
      }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must have 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and confirm password must be same",
  });

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      toast({
        title: "Registration failed!",
        description: data.message,
      });
      router.push("/sign-in");
    } else {
      const data = await response.json();
      toast({
        title: "Registration failed!",
        description: data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <h2 className="text-lg font-medium">Sign Up</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2 mt-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={fieldState.invalid ? `text-foreground` : ""}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={fieldState.invalid ? `text-foreground` : ""}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={fieldState.invalid ? `text-foreground` : ""}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={fieldState.invalid ? `text-foreground` : ""}
                >
                  Re-Enter your password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full !mt-4"
          >
            Sign Up
          </Button>
        </form>

        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-border after:ml-4 after:block after:h-px after:flex-grow after:bg-border">
          or
        </div>
        <p className="text-center text-sm text-foreground mt-2">
          If you already have an account, please&nbsp;{" "}
          <Link
            className="text-primary hover:underline"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </Form>
    </>
  );
};

export default SignUpForm;
