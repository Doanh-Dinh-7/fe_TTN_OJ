import { useState } from "react";
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { apiClient } from "@/services/api";

export function AdminContestsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [leaderboardHidden, setLeaderboardHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !startTime || !endTime) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", status: "error" });
      return;
    }
    setLoading(true);
    try {
      await apiClient.post("/contests", {
        name,
        description: description || undefined,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        is_public: isPublic,
        leaderboard_hidden: leaderboardHidden,
      });
      toast({ title: "Tạo kỳ thi thành công", status: "success" });
      setName("");
      setDescription("");
      setStartTime("");
      setEndTime("");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast({ title: msg ?? "Lỗi tạo kỳ thi", status: "error" });
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
      <Heading size="md">Tạo kỳ thi</Heading>
      <FormControl isRequired>
        <FormLabel>Tên kỳ thi</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên kỳ thi"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Mô tả</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả (tùy chọn)"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Thời gian bắt đầu</FormLabel>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Thời gian kết thúc</FormLabel>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb={0}>Công khai</FormLabel>
        <Switch
          isChecked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb={0}>Ẩn leaderboard</FormLabel>
        <Switch
          isChecked={leaderboardHidden}
          onChange={(e) => setLeaderboardHidden(e.target.checked)}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" isLoading={loading}>
        Tạo kỳ thi
      </Button>
    </VStack>
  );
}
