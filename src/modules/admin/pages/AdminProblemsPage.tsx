import { useState } from "react";
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { adminService } from "../services";

export function AdminProblemsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxScore, setMaxScore] = useState(100);
  const [timeLimitMs, setTimeLimitMs] = useState(1000);
  const [memoryLimitMb, setMemoryLimitMb] = useState(256);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast({ title: "Vui lòng nhập tiêu đề đề bài", status: "error" });
      return;
    }
    setLoading(true);
    try {
      await adminService.createProblem({
        title,
        description,
        max_score: maxScore,
        time_limit_ms: timeLimitMs,
        memory_limit_mb: memoryLimitMb,
      });
      toast({ title: "Tạo đề thành công", status: "success" });
      setTitle("");
      setDescription("");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast({ title: msg ?? "Lỗi tạo đề", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack
      as="form"
      spacing={4}
      align="stretch"
      maxW="md"
      onSubmit={handleSubmit}
    >
      <Heading size="md">Tạo đề</Heading>
      <FormControl isRequired>
        <FormLabel>Tiêu đề</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tiêu đề đề bài"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Mô tả</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả đề bài"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Điểm tối đa</FormLabel>
        <Input
          type="number"
          value={maxScore}
          onChange={(e) => setMaxScore(Number(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Time limit (ms)</FormLabel>
        <Input
          type="number"
          value={timeLimitMs}
          onChange={(e) => setTimeLimitMs(Number(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Memory limit (MB)</FormLabel>
        <Input
          type="number"
          value={memoryLimitMb}
          onChange={(e) => setMemoryLimitMb(Number(e.target.value))}
        />
      </FormControl>
      <Button type="submit" colorScheme="green" isLoading={loading}>
        Tạo đề
      </Button>
    </VStack>
  );
}
