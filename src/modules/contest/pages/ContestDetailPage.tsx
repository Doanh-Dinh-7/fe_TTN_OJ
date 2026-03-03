import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, Text, Spinner } from '@chakra-ui/react'
import { contestService, type ContestDetail, type ContestProblem } from '../services/contestService'
import { ProblemList } from '../components/ProblemList'
import { SubmitCodeForm } from '../components/SubmitCodeForm'

export function ContestDetailPage() {
  const { contestId } = useParams<{ contestId: string }>()
  const [contest, setContest] = useState<ContestDetail | null>(null)
  const [problems, setProblems] = useState<ContestProblem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null)

  useEffect(() => {
    if (!contestId) return
    Promise.all([contestService.getById(contestId), contestService.getProblems(contestId)])
      .then(([c, ps]) => {
        setContest(c)
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
        {contest.name}
      </Heading>
      {contest.description && (
        <Text color="gray.600" mb={4}>
          {contest.description}
        </Text>
      )}
      <Heading size="sm" mb={2}>
        Problems
      </Heading>
      <ProblemList
        problems={problems}
        selectedProblemId={selectedProblemId}
        onSelectProblem={setSelectedProblemId}
      />
      {selectedProblemId && contestId && (
        <SubmitCodeForm contestId={contestId} problemId={selectedProblemId} />
      )}
    </Box>
  )
}
