import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Heading,
  Text,
  Spinner,
  List,
  ListItem,
  Link,
  Badge,
} from '@chakra-ui/react'
import { contestService } from '../api/contestService'
import { ContestProblem } from '../api/contestService'
import { SubmitCodeForm } from '../components/SubmitCodeForm'

export function ContestDetailPage() {
  const { contestId } = useParams<{ contestId: string }>()
  const [contest, setContest] = useState<Record<string, unknown> | null>(null)
  const [problems, setProblems] = useState<ContestProblem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null)

  useEffect(() => {
    if (!contestId) return
    Promise.all([contestService.getById(contestId), contestService.getProblems(contestId)])
      .then(([c, ps]) => {
        setContest(c as Record<string, unknown>)
        setProblems(ps)
        if (ps.length) setSelectedProblemId(ps[0].id)
      })
      .catch(() => setContest(null))
      .finally(() => setLoading(false))
  }, [contestId])

  if (loading || !contest) return <Spinner />
  return (
    <Box>
      <Heading size="md" mb={2}>
        {contest.name as string}
      </Heading>
      {contest.description && (
        <Text color="gray.600" mb={4}>
          {contest.description as string}
        </Text>
      )}
      <Heading size="sm" mb={2}>
        Problems
      </Heading>
      <List spacing={2} mb={6}>
        {problems.map((p) => (
          <ListItem key={p.id}>
            <Link
              onClick={() => setSelectedProblemId(p.id)}
              fontWeight={selectedProblemId === p.id ? 'bold' : 'normal'}
            >
              {p.title}
            </Link>
            <Badge ml={2}>{p.maxScore} pts</Badge>
          </ListItem>
        ))}
      </List>
      {selectedProblemId && contestId && (
        <SubmitCodeForm contestId={contestId} problemId={selectedProblemId} />
      )}
    </Box>
  )
}
