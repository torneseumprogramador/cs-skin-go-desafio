import { RegisterForm } from "@/components/organisms/register-form"
import { AuthLayout } from "@/components/molecules/auth-layout"

export default function CadastroPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
