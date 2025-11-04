export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export const authService = {
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Erro ao fazer login" }
      }

      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: "Erro ao conectar com o servidor" }
    }
  },

  async register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Erro ao fazer cadastro" }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: "Erro ao conectar com o servidor" }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch("/api/auth/me")

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      return null
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  },
}

