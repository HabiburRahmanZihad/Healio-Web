"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Verifying your email address...");

    useEffect(() => {
        async function verify() {
            if (!token) {
                setStatus("error");
                setMessage("No verification token found. Please check your email link again.");
                return;
            }

            try {
                const { data, error } = await authClient.verifyEmail({
                    query: {
                        token: token,
                    },
                });

                if (error) {
                    setStatus("error");
                    setMessage(error.message || "Failed to verify email. The link may have expired.");
                    return;
                }

                setStatus("success");
                setMessage("Your email has been successfully verified! You can now sign in to your account.");
                toast.success("Email verified successfully!");

                // Auto-redirect after a few seconds
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } catch (err) {
                console.error("Verification error:", err);
                setStatus("error");
                setMessage("An unexpected error occurred during verification.");
            }
        }

        verify();
    }, [token, router]);

    return (
        <Card className="w-full max-w-md border-border/50 shadow-xl overflow-hidden">
            <div className="h-2 bg-primary/20 w-full overflow-hidden">
                {status === "loading" && <div className="h-full bg-primary animate-progress-stripes" style={{ width: "50%" }} />}
                {status === "success" && <div className="h-full bg-green-500" style={{ width: "100%" }} />}
                {status === "error" && <div className="h-full bg-destructive" style={{ width: "100%" }} />}
            </div>

            <CardHeader className="text-center pt-8">
                <div className="mx-auto flex items-center justify-center size-16 rounded-full mb-4 bg-background border shadow-sm">
                    {status === "loading" && <Loader2 className="size-8 text-primary animate-spin" />}
                    {status === "success" && <CheckCircle2 className="size-8 text-green-500 animate-in zoom-in duration-500" />}
                    {status === "error" && <XCircle className="size-8 text-destructive animate-in zoom-in duration-500" />}
                </div>
                <CardTitle className="text-2xl font-bold">
                    {status === "loading" && "Verification in Progress"}
                    {status === "success" && "Verification Successful!"}
                    {status === "error" && "Verification Failed"}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                    {message}
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-8 pt-4 flex flex-col gap-4">
                {status === "success" && (
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
                        <Link href="/login" className="flex items-center justify-center gap-2">
                            Go to Login <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                )}

                {status === "error" && (
                    <div className="flex flex-col gap-2">
                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
                            <Link href="/signup">Try Signing Up Again</Link>
                        </Button>
                        <Button variant="ghost" asChild className="w-full">
                            <Link href="/contact-us">Contact Support</Link>
                        </Button>
                    </div>
                )}

                {status === "loading" && (
                    <p className="text-xs text-center text-muted-foreground animate-pulse">
                        Please wait while we secure your account...
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Suspense fallback={
                <Card className="w-full max-w-md border-border/50 shadow-xl py-12 flex flex-col items-center justify-center">
                    <Loader2 className="size-12 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading verification module...</p>
                </Card>
            }>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
