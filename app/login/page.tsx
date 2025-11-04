import { LoginForm } from "@/components/organisms/login-form"
import { AuthLayout } from "@/components/molecules/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
