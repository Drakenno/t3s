"use client";

import { useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
  FormItem,
} from "~/components/ui/form";
import { LoginSchema } from "~/app/auth/login";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { login } from "~/server/actions";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await login(values)
        // console.log(data);
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else if (data.success) {
            setSuccess(data.success);
          }
        });
    });
  };

  return (
    // <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    //   <h1 className="text-2xl font-bold">LoginForm</h1>
    // </div>
    <CardWrapper
      headerLabel="Welcome to SMA"
      backButtonLabel="Dont have an account?"
      backButtonHref="/auth/register"
      showSocial
      //   className="text-primary-foreground"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4"></div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="hello@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="*********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex flex-row justify-center gap-x-2">
            <Button disabled={isPending} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
