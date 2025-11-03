export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface StoredUser extends User {
  password: string
}

const USERS_KEY = "skinarena_users"
const CURRENT_USER_KEY = "skinarena_current_user"

// Get all registered users from localStorage
export function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

// Save users to localStorage
function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Register a new user
export function registerUser(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = getStoredUsers()

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "Este e-mail já está cadastrado" }
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password, // In production, this should be hashed
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  return { success: true }
}

// Login user
export function loginUser(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getStoredUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { success: false, error: "E-mail ou senha incorretos" }
  }

  // Store current user (without password)
  const currentUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))

  return { success: true, user: currentUser }
}

// Get current logged in user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

// Logout user
export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// Check if user is logged in
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
