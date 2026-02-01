import { LoginForm } from "@/components/modules/authentication/login-form"
import { Suspense } from "react"

export default function Page() {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-1/4 w-full h-full bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-full h-full bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <Suspense fallback={
          <div className="flex items-center justify-center p-8 bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="size-10 rounded-full border-t-2 border-primary animate-spin" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
