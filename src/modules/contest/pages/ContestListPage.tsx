import { useEffect, useState } from 'react'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import { contestService, type ContestItem } from '../services/contestService'
import { ContestTable } from '../components/ContestTable'

export function ContestListPage() {
  const [contests, setContests] = useState<ContestItem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    contestService
      .list(false)
      .then(setContests)
      .catch(() => setContests([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />
  return (
    <Box>
      <Heading size="md" mb={4}>
        Contests
      </Heading>
      <ContestTable contests={contests} />
    </Box>
  )
}
