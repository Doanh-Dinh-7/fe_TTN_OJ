import { VStack, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { routePaths } from "@/routes/routePaths";

export function AdminDashboardPage() {
  return (
    <VStack spacing={8} py={10} align="stretch">
      <Heading size="lg">Quản trị</Heading>
      <Text color="gray.600">Chỉ Admin mới truy cập được trang này.</Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        <Button
          as={RouterLink}
          to={routePaths.adminContests}
          colorScheme="blue"
          size="lg"
        >
          Tạo kỳ thi
        </Button>
        <Button
          as={RouterLink}
          to={routePaths.adminProblems}
          colorScheme="green"
          size="lg"
        >
          Tạo đề
        </Button>
        <Button
          as={RouterLink}
          to={routePaths.adminSubmissions}
          colorScheme="purple"
          size="lg"
        >
          Xem tất cả submission
        </Button>
        <Button
          as={RouterLink}
          to={routePaths.adminUsers}
          colorScheme="orange"
          size="lg"
        >
          Quản lý user
        </Button>
      </SimpleGrid>
    </VStack>
  );
}
