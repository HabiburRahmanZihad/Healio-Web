"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, User as UserIcon, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
  role: z.enum(["CUSTOMER", "SELLER"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [verificationUrl, setVerificationUrl] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER",
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const toastId = toast.loading("Creating your account...");
      try {
        const { name, email, password, role } = value;
        // Use custom registration endpoint to avoid proxy issues and get verificationUrl back
        const res = await fetch("/api/auth-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
            callbackURL: "/login"
          }),
        });

        // Safely parse JSON
        let response;
        const text = await res.text();
        console.log("Raw server response:", text);

        try {
          response = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse response JSON. Raw text:", text);
          // If it's not JSON, show the text itself if it's short, otherwise a generic error
          const displayErr = text.length < 100 ? text : "Server returned an invalid format. Please try again or check logs.";
          toast.error(displayErr, { id: toastId });
          setIsLoading(false);
          return;
        }

        console.log("Parsed signup response:", response);

        // Check if there's an error in the response
        if (response?.error) {
          const errorMessage = typeof response.error === 'string'
            ? response.error
            : (response.error.message || "Failed to create account");

          toast.error(errorMessage, { id: toastId });
          setIsLoading(false);
          return;
        }

        // Direct access to data (response might be flat or nested)
        const data = response;

        // Check for fallback verification link (if SMTP failed or we want to show it)
        if (data?.verificationUrl) {
          setVerificationUrl(data.verificationUrl);
          setShowVerifyModal(true);
          toast.success("Account created! Please verify your email.", { id: toastId });
          setIsLoading(false);
          return;
        }

        // If we have user data in response, it's a success
        if (data?.user) {
          toast.success("Account created successfully! Please check your email.", { id: toastId });
          setTimeout(() => {
            router.push("/login");
          }, 2000);
          return;
        }

        // Default success fallback
        toast.success("Account created! Please check your email to verify.", { id: toastId });
        setTimeout(() => {
          router.push("/login");
        }, 2000);

      } catch (error: unknown) {
        console.error("Signup catch block error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during signup";
        toast.error(errorMessage, { id: toastId });
        setIsLoading(false);
      }
    },
  });



  return (
    <div className={className} {...props}>
      <Card className="border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="role"
              children={(field) => (
                <div className="space-y-3">
                  <Label>Join as</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => field.handleChange("CUSTOMER")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                        field.state.value === "CUSTOMER"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border/50 hover:bg-muted/50 text-muted-foreground"
                      )}
                    >
                      <UserIcon className="size-6" />
                      <span className="text-sm font-semibold">Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.handleChange("SELLER")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all",
                        field.state.value === "SELLER"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border/50 hover:bg-muted/50 text-muted-foreground"
                      )}
                    >
                      <StoreIcon className="size-6" />
                      <span className="text-sm font-semibold">Seller</span>
                    </button>
                  </div>
                </div>
              )}
            />

            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <form.Field
              name="password"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={field.state.meta.errors.length ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 text-muted-foreground" />
                      ) : (
                        <Eye className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {field.state.meta.errors ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <form.Field
              name="confirmPassword"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={field.state.meta.errors.length ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4 text-muted-foreground" />
                      ) : (
                        <Eye className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {field.state.meta.errors ? (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>


        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 p-6">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>

      <div className="text-center text-xs text-muted-foreground mt-4">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </div>

      {/* Verification Fallback Modal */}
      {showVerifyModal && verificationUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-md border-primary/20 shadow-2xl animate-in zoom-in-95 duration-300">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                <StoreIcon className="size-6" />
              </div>
              <CardTitle className="text-xl font-bold">One last step!</CardTitle>
              <CardDescription>
                We&apos;ve sent a verification email, but you can also verify your account instantly using the link below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm">
                <p className="font-semibold mb-1 text-foreground">Verification Link:</p>
                <p className="break-all font-mono text-[10px] opacity-80 mb-3">{verificationUrl}</p>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
                  onClick={() => {
                    setTimeout(() => router.push("/login"), 500);
                  }}
                >
                  <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
                    Verify Account Now
                  </a>
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground">
                Click the button above to verify your account in a new tab. Once verified, you can sign in.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
