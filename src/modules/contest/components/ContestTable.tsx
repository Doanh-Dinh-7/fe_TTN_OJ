import { Link as RouterLink } from "react-router-dom";
import { Link, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { routePaths } from "@/routes/routePaths";
import { ContestItem } from "../controllers";

interface ContestTableProps {
  contests: ContestItem[];
}

export function ContestTable({ contests }: ContestTableProps) {
  return (
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
              <Link as={RouterLink} to={routePaths.contestDetail(c.id)}>
                {c.name}
              </Link>
            </Td>
            <Td>{new Date(c.startTime).toLocaleString()}</Td>
            <Td>{new Date(c.endTime).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
