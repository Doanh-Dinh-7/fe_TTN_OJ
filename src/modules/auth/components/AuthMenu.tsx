import { Button, HStack } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/controllers/AuthContext'
import { routePaths } from '@/routes/routePaths'
import type { User } from '@/controllers/AuthContext'

interface AuthMenuProps {
  user: User | null
}

export function AuthMenu({ user }: AuthMenuProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    navigate(routePaths.home)
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
      <Button as={RouterLink} to={routePaths.login} size="sm" variant="ghost">
        Login
      </Button>
      <Button as={RouterLink} to={routePaths.register} size="sm" colorScheme="blue">
        Register
      </Button>
    </HStack>
  )
}
