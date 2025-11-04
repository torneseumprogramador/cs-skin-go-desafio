"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService } from "@/services/auth"
import { userService } from "@/services/user"
import type { User } from "@/types/auth.types"
import type { UserData } from "@/types/user.types"

interface AuthContextType {
  user: User | null
  userData: UserData | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUserData: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUserData = async () => {
    if (user) {
      try {
        const data = await userService.getUserData()
        setUserData(data)
      } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error)
      }
    }
  }

  useEffect(() => {
    // Check for existing session on mount
    async function checkAuth() {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
      if (currentUser) {
        try {
          const data = await userService.getUserData()
          setUserData(data)
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error)
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password)
    if (result.success && result.user) {
      setUser(result.user)
      try {
        const data = await userService.getUserData()
        setUserData(data)
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error)
      }
    }
    return result
  }

  const register = async (name: string, email: string, password: string) => {
    const result = await authService.register(name, email, password)
    if (result.success) {
      // Auto login after registration
      return login(email, password)
    }
    return result
  }

  const logout = async () => {
    await authService.logout()
    setUser(null)
    setUserData(null)
  }

  return (
    <AuthContext.Provider value={{ user, userData, isLoading, login, register, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
