import { Outlet } from 'react-router-dom'
import { Box, Container, Heading, HStack, Link, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AuthMenu } from './AuthMenu'

export function Layout() {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const { user } = useAuth()
  return (
    <Box minH="100vh" bg={bg}>
      <Box as="header" borderBottomWidth="1px" py={3} px={4}>
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <Heading size="md">
              <Link as={RouterLink} to="/">
                TTN OJ
              </Link>
            </Heading>
            <HStack gap={4}>
              <Link as={RouterLink} to="/contests">
                Contests
              </Link>
              <AuthMenu user={user} />
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.xl" py={6}>
        <Outlet />
      </Container>
    </Box>
  )
}
