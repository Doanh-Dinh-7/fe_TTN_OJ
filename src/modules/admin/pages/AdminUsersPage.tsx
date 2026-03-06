import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { AdminUser } from "../controllers";
import { adminService } from "../services";

const PAGE_SIZE = 20;

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [roleDraft, setRoleDraft] = useState<Record<string, string>>({});
  const toast = useToast();

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    adminService
      .listUsers({ skip, limit: PAGE_SIZE })
      .then((data) => {
        setUsers(data);
        setRoleDraft((prev) => {
          const next = { ...prev };
          data.forEach((u) => {
            if (next[u.id] === undefined) next[u.id] = u.role;
          });
          return next;
        });
      })
      .catch((e) =>
        setError(e?.response?.data?.message ?? "Lỗi tải danh sách user"),
      )
      .finally(() => setLoading(false));
  }, [skip]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLock = (user: AdminUser) => {
    if (user.locked) return;
    setUpdatingId(user.id);
    adminService
      .lockUser(user.id)
      .then(() => {
        toast({ title: "Đã khóa user", status: "success", isClosable: true });
        fetchUsers();
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.message ?? "Không thể khóa",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => setUpdatingId(null));
  };

  const handleUnlock = (user: AdminUser) => {
    if (!user.locked) return;
    setUpdatingId(user.id);
    adminService
      .unlockUser(user.id)
      .then(() => {
        toast({
          title: "Đã mở khóa user",
          status: "success",
          isClosable: true,
        });
        fetchUsers();
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.message ?? "Không thể mở khóa",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => setUpdatingId(null));
  };

  const handleRoleChange = (user: AdminUser) => {
    const newRole = (roleDraft[user.id] ?? user.role) as "admin" | "user";
    if (newRole === user.role) return;
    setUpdatingId(user.id);
    adminService
      .setUserRole(user.id, newRole)
      .then(() => {
        toast({
          title: "Đã cập nhật quyền",
          status: "success",
          isClosable: true,
        });
        fetchUsers();
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.message ?? "Không thể đổi quyền",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => setUpdatingId(null));
  };

  if (loading && users.length === 0) return <Spinner size="xl" />;
  if (error && users.length === 0) return <Text color="red.500">{error}</Text>;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Quản lý user
      </Heading>
      <TableContainer>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Xác thực</Th>
              <Th>Quyền</Th>
              <Th>Trạng thái</Th>
              <Th>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((u) => (
              <Tr key={u.id}>
                <Td fontWeight="medium">{u.username}</Td>
                <Td>{u.email}</Td>
                <Td>
                  {u.verified ? (
                    <Badge colorScheme="green">Đã xác thực</Badge>
                  ) : (
                    <Badge colorScheme="gray">Chưa xác thực</Badge>
                  )}
                </Td>
                <Td>
                  <HStack gap={2} wrap="wrap">
                    <Select
                      size="sm"
                      width="auto"
                      minW="24"
                      value={roleDraft[u.id] ?? u.role}
                      onChange={(e) =>
                        setRoleDraft((prev) => ({
                          ...prev,
                          [u.id]: e.target.value,
                        }))
                      }
                      isDisabled={!!updatingId}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </Select>
                    <Button
                      size="xs"
                      colorScheme="blue"
                      onClick={() => handleRoleChange(u)}
                      isLoading={updatingId === u.id}
                      isDisabled={
                        (roleDraft[u.id] ?? u.role) === u.role ||
                        updatingId !== null
                      }
                    >
                      Áp dụng
                    </Button>
                  </HStack>
                </Td>
                <Td>
                  {u.locked ? (
                    <Badge colorScheme="red">Đã khóa</Badge>
                  ) : (
                    <Badge colorScheme="green">Hoạt động</Badge>
                  )}
                </Td>
                <Td>
                  <HStack gap={1}>
                    {u.locked ? (
                      <Tooltip label="Mở khóa">
                        <Button
                          size="xs"
                          colorScheme="green"
                          onClick={() => handleUnlock(u)}
                          isLoading={updatingId === u.id}
                          isDisabled={!!updatingId}
                        >
                          Mở khóa
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip label="Khóa user (không đăng nhập được)">
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleLock(u)}
                          isLoading={updatingId === u.id}
                          isDisabled={!!updatingId}
                        >
                          Khóa
                        </Button>
                      </Tooltip>
                    )}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack mt={4} gap={2}>
        <Button
          size="sm"
          isDisabled={skip === 0 || loading}
          onClick={() => setSkip((s) => Math.max(0, s - PAGE_SIZE))}
        >
          Trước
        </Button>
        <Text fontSize="sm" color="gray.600">
          Từ {skip + 1} – {skip + users.length}
        </Text>
        <Button
          size="sm"
          isDisabled={users.length < PAGE_SIZE || loading}
          onClick={() => setSkip((s) => s + PAGE_SIZE)}
        >
          Sau
        </Button>
      </HStack>
    </Box>
  );
}
