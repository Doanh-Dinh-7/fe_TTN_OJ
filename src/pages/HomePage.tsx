import { VStack, Heading, Text, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { routePaths } from '@/routes/routePaths'

export function HomePage() {
  return (
    <VStack spacing={6} py={10}>
      <Heading size="lg">TTN Online Judge</Heading>
      <Text color="gray.600">Programming contests. Submit code. Get judged.</Text>
      <Button as={RouterLink} to={routePaths.contests} colorScheme="blue">
        Browse Contests
      </Button>
    </VStack>
  )
}
