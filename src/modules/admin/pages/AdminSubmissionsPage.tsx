import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { adminService } from "../services";

export function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<
    Array<Record<string, unknown>>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminService
      .listSubmissions({ limit: 100 })
      .then(setSubmissions)
      .catch((e) => setError(e?.response?.data?.message ?? "Lỗi tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Tất cả submission
      </Heading>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>User</Th>
              <Th>Contest</Th>
              <Th>Problem</Th>
              <Th>Status</Th>
              <Th>Score</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {submissions.map((s) => (
              <Tr key={String(s.id)}>
                <Td>{String(s.id).slice(0, 8)}</Td>
                <Td>{String(s.user_id).slice(0, 8)}</Td>
                <Td>{String(s.contest_id).slice(0, 8)}</Td>
                <Td>{String(s.problem_id).slice(0, 8)}</Td>
                <Td>{String(s.status)}</Td>
                <Td>{String(s.score)}</Td>
                <Td>{String(s.created_at).slice(0, 19)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
