import { useState } from 'react'
import { Box, Button, Textarea, useToast } from '@chakra-ui/react'
import { submissionService } from '../api/submissionService'

interface SubmitCodeFormProps {
  contestId: string
  problemId: string
}

export function SubmitCodeForm({ contestId, problemId }: SubmitCodeFormProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({ title: 'Enter code', status: 'warning' })
      return
    }
    setLoading(true)
    try {
      await submissionService.create(contestId, problemId, code, 'python')
      toast({ title: 'Submission queued', status: 'success' })
      setCode('')
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Submit failed'
      toast({ title: message || 'Submit failed', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Textarea
        placeholder="Your Python code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fontFamily="mono"
        minH="200px"
        mb={3}
      />
      <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
        Submit
      </Button>
    </Box>
  )
}
