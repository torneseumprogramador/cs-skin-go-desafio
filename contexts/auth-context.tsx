"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCurrentUser, loginUser, logoutUser, registerUser, type User } from "@/lib/auth"
import { getUserData, type UserData } from "@/lib/user-data"

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

  const refreshUserData = () => {
    if (user) {
      const data = getUserData(user.id)
      setUserData(data)
    }
  }

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = getCurrentUser()
    setUser(currentUser)
    if (currentUser) {
      const data = getUserData(currentUser.id)
      setUserData(data)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = loginUser(email, password)
    if (result.success && result.user) {
      setUser(result.user)
      const data = getUserData(result.user.id)
      setUserData(data)
    }
    return result
  }

  const register = async (name: string, email: string, password: string) => {
    const result = registerUser(name, email, password)
    if (result.success) {
      // Auto login after registration
      return login(email, password)
    }
    return result
  }

  const logout = () => {
    logoutUser()
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
