export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface StoredUser extends User {
  password: string
}

export interface LoginResponse {
  success: boolean
  error?: string
  user?: User
}

export interface RegisterResponse {
  success: boolean
  error?: string
}

