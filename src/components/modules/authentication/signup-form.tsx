"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, User as UserIcon, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
    } as any,
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } as any,
  },
};

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
      const toastId = toast.loading("Synthesizing identity...");
      try {
        const { name, email, password, role } = value;

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

        const text = await res.text();
        let response;
        try {
          response = JSON.parse(text);
        } catch (e) {
          toast.error("Protocol Breach", {
            description: "The server sent an invalid response. Please try again later.",
            id: toastId
          });
          setIsLoading(false);
          return;
        }

        if (response?.error) {
          const errMsg = typeof response.error === 'string'
            ? response.error
            : (response.error.message || "An unexpected error occurred.");

          toast.error("Registration Failed", {
            description: errMsg,
            id: toastId
          });
          setIsLoading(false);
          return;
        }

        toast.success("Identity Established", {
          description: "Account created successfully. Redirecting to access node...",
          id: toastId
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Network error. Please check your connection.";
        toast.error("System Failure", {
          description: errorMessage,
          id: toastId
        });
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={cn("relative w-full max-w-[500px] mx-auto", className)} {...props}>
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl"
      >
        <div className="px-8 pt-12 pb-10">
          <motion.div variants={itemVariants} className="text-center space-y-3 mb-10">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Create <span className="text-primary not-italic">Identity</span>
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Join the future of pharmaceutical management
            </p>
          </motion.div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.Field
              name="role"
              children={(field) => (
                <motion.div variants={itemVariants} className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Protocol Role</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => field.handleChange("CUSTOMER")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300",
                        field.state.value === "CUSTOMER"
                          ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                          : "border-white/5 bg-white/5 hover:bg-white/10 text-gray-500"
                      )}
                    >
                      <UserIcon size={24} className={field.state.value === "CUSTOMER" ? "animate-bounce" : ""} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => field.handleChange("SELLER")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300",
                        field.state.value === "SELLER"
                          ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                          : "border-white/5 bg-white/5 hover:bg-white/10 text-gray-500"
                      )}
                    >
                      <StoreIcon size={24} className={field.state.value === "SELLER" ? "animate-bounce" : ""} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Seller</span>
                    </button>
                  </div>
                </motion.div>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="name"
                children={(field) => (
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="JOHN DOE"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(
                        "h-12 bg-white/5 border-white/10 rounded-xl px-4 text-sm text-white transition-all focus:ring-primary/20 focus:border-primary/50",
                        field.state.meta.errors.length && "border-red-500/50"
                      )}
                    />
                  </motion.div>
                )}
              />

              <form.Field
                name="email"
                children={(field) => (
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Endpoint</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="M@EXAMPLE.COM"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(
                        "h-12 bg-white/5 border-white/10 rounded-xl px-4 text-sm text-white transition-all focus:ring-primary/20 focus:border-primary/50",
                        field.state.meta.errors.length && "border-red-500/50"
                      )}
                    />
                  </motion.div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="password"
                children={(field) => (
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          "h-12 bg-white/5 border-white/10 rounded-xl px-4 pr-10 text-sm text-white transition-all focus:ring-primary/20 focus:border-primary/50",
                          field.state.meta.errors.length && "border-red-500/50"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              />

              <form.Field
                name="confirmPassword"
                children={(field) => (
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          "h-12 bg-white/5 border-white/10 rounded-xl px-4 pr-10 text-sm text-white transition-all focus:ring-primary/20 focus:border-primary/50",
                          field.state.meta.errors.length && "border-red-500/50"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </motion.div>
                )}
              />
            </div>

            <motion.div variants={itemVariants} className="pt-4">
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Already in directory?{" "}
              <Link href="/login" className="text-primary hover:underline underline-offset-4">
                Access Vault
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Info strip */}
        <div className="bg-white/5 px-8 py-4 text-center">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] leading-relaxed">
            Joining Healio constitutes acceptance of the{" "}
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white">Legal Protocol</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
