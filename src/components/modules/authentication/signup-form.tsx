"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
})




export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async (value) => {
      console.log(" Form submitted with values:", value);
      const toastId = toast.loading("Creating your account...");
      try {
        // Exclude confirmPassword before sending to API
        const { name, email, password } = value.value;
        const { error } = await authClient.signUp.email({ name, email, password });
        if (error) {
          toast.error(`Error: ${error.message}`, { id: toastId });
          return;
        }
        toast.success("Account created successfully! Please check your email to verify your account.", { id: toastId });
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("An unexpected error occurred. Please try again later.", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    })

    console.log(data);
  };



  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>

        <form
          id="Signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
          className="space-y-4">

          <FieldGroup>

            <form.Field
              name="name"
              children={(field) => {

                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {
                      isInvalid && (
                        <FieldError errors={field.state.meta.errors}></FieldError>
                      )
                    }
                  </Field>
                )
              }}
            />

            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )
                    }
                  </Field>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )
                    }
                  </Field>
                )
              }}
            />

            <form.Field
              name="confirmPassword"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors}></FieldError>
                    )
                    }
                  </Field>
                )
              }}
            />

          </FieldGroup>

        </form>
      </CardContent>

      <CardFooter>
        <button
          form="Signup-form"
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
        <Button onClick={handleGoogleLogin} variant="outline" type="button">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
