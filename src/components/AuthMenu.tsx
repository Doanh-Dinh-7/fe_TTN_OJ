import { Button, HStack } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface User {
  id: string
  email: string
  username: string
  verified: boolean
  roleId: string
}

interface AuthMenuProps {
  user: User | null
}

export function AuthMenu({ user }: AuthMenuProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  if (user) {
    return (
      <HStack>
        <span>{user.username}</span>
        <Button size="sm" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    )
  }
  return (
    <HStack>
      <Button as={RouterLink} to="/login" size="sm" variant="ghost">
        Login
      </Button>
      <Button as={RouterLink} to="/register" size="sm" colorScheme="blue">
        Register
      </Button>
    </HStack>
  )
}
