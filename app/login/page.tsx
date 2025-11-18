import { Suspense } from "react"
import { LoginForm } from "@/components/organisms/login-form"
import { AuthLayout } from "@/components/molecules/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-center">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  )
}
