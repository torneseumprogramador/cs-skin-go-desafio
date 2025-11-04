import type { ReactNode } from "react"
import type { Skin } from "./cases.types"
import type { User } from "./auth.types"
import type { UserData } from "./user.types"

// Auth Layout Props
export interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

// Case Card Props
export interface CaseCardProps {
  id: string
  name: string
  price: number
  image: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  isFree?: boolean
}

// Case Details Props
export interface CaseDetailsProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  skins: Skin[]
}

// Auth Context Type
export interface AuthContextType {
  user: User | null
  userData: UserData | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUserData: () => void
}

