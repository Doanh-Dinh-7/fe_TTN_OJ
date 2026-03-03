import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Heading, Link, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { contestService, ContestItem } from '../api/contestService'

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
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Start</Th>
            <Th>End</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contests.map((c) => (
            <Tr key={c.id}>
              <Td>
                <Link as={RouterLink} to={`/contests/${c.id}`}>
                  {c.name}
                </Link>
              </Td>
              <Td>{new Date(c.startTime).toLocaleString()}</Td>
              <Td>{new Date(c.endTime).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
