import { User } from '@prisma/client'
import { DefaultSession } from 'next-auth'

export interface Role {
  id: string
  name: string
}

export interface CustomUser extends Omit<User, 'hashedPassword' | 'roles'> {
  roles: Role[]
}

// Extend next-auth session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      roles: Role[]
    } & DefaultSession['user']
  }
}

// Extend next-auth JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    roles: Role[]
  }
}

export interface AuthResult {
  success: boolean
  data?: CustomUser
  error?: {
    code: string
    message: string
  }
}
