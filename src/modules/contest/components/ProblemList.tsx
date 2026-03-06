import { List, ListItem, Link, Badge } from "@chakra-ui/react";
import { ContestProblem } from "../controllers";

interface ProblemListProps {
  problems: ContestProblem[];
  selectedProblemId: string | null;
  onSelectProblem: (problemId: string) => void;
}

export function ProblemList({
  problems,
  selectedProblemId,
  onSelectProblem,
}: ProblemListProps) {
  return (
    <List spacing={2} mb={6}>
      {problems.map((p) => (
        <ListItem key={p.id}>
          <Link
            onClick={() => onSelectProblem(p.id)}
            fontWeight={selectedProblemId === p.id ? "bold" : "normal"}
          >
            {p.title}
          </Link>
          <Badge ml={2}>{p.maxScore} pts</Badge>
        </ListItem>
      ))}
    </List>
  );
}
