"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
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

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await authClient.signIn.email({
          email: value.email,
          password: value.password,
          fetchOptions: {
            onSuccess: async (ctx) => {
              const user = ctx.data.user;
              if (user && (user as any).isBlocked) {
                await authClient.signOut();
                toast.error("Account Blocked", {
                  description: "Please contact administration for assistance.",
                  duration: 5000,
                });
                return;
              }
              toast.success("Authentication successful", {
                description: `Welcome back to Healio.`,
              });
              router.push("/");
            },
            onError: (ctx) => {
              toast.error("Authentication failed", {
                description: ctx.error.message,
              });
            }
          }
        });
      } catch (error) {
        toast.error("System error", {
          description: "Something went wrong. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={cn("relative w-full max-w-[450px] mx-auto", className)} {...props}>
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl"
      >
        <div className="px-8 pt-12 pb-10">
          <motion.div variants={itemVariants} className="text-center space-y-3 mb-10">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Access <span className="text-primary not-italic">Vault</span>
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Secure authentication for the healthcare ecosystem
            </p>
          </motion.div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <form.Field
                name="email"
                children={(field) => (
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                      Identity Marker (Email)
                    </Label>
                    <div className="relative group">
                      <Input
                        id="email"
                        type="email"
                        placeholder="operator@healio.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          "h-14 bg-white/5 border-white/10 rounded-2xl px-5 text-white placeholder:text-gray-600 transition-all duration-300 focus:ring-primary/20 focus:border-primary/50",
                          field.state.meta.errors.length && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10"
                        )}
                      />
                    </div>
                    {field.state.meta.errors ? (
                      <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                        {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                      </p>
                    ) : null}
                  </motion.div>
                )}
              />

              <form.Field
                name="password"
                children={(field) => (
                  <motion.div variants={itemVariants} className="space-y-2.5">
                    <div className="flex items-center justify-between ml-1">
                      <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Security Phrase (Password)
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-[9px] font-black uppercase tracking-widest text-primary/70 hover:text-primary transition-colors"
                      >
                        Recovery Node
                      </Link>
                    </div>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={cn(
                          "h-14 bg-white/5 border-white/10 rounded-2xl px-5 pr-14 text-white placeholder:text-gray-600 transition-all duration-300 focus:ring-primary/20 focus:border-primary/50",
                          field.state.meta.errors.length && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors p-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {field.state.meta.errors ? (
                      <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                        {field.state.meta.errors.map((error: any) => error?.message || error).join(", ")}
                      </p>
                    ) : null}
                  </motion.div>
                )}
              />
            </div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-[0.98] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Synchronizing...</span>
                  </div>
                ) : (
                  "Initiate Login"
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-white/5 text-center space-y-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              No account in directory?{" "}
              <Link href="/signup" className="text-primary hover:underline underline-offset-4">
                Establish Identity
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Info strip */}
        <div className="bg-white/5 px-8 py-4 text-center">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] leading-relaxed">
            By proceeding, you acknowledge the{" "}
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Digital Agreement</Link>
            {" "}and{" "}
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Data Protocol</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
