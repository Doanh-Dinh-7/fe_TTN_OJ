import { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Link,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "@/controllers/AuthContext";
import { routePaths } from "@/routes/routePaths";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    routePaths.contests;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast({ title: "Nhập đầy đủ username và mật khẩu", status: "warning" });
      return;
    }
    setLoading(true);
    try {
      await login(username.trim(), password);
      toast({ title: "Đăng nhập thành công", status: "success" });
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Đăng nhập thất bại";
      toast({ title: message || "Đăng nhập thất bại", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" py={8}>
      <Card>
        <CardHeader>
          <Heading size="md" textAlign="center">
            Đăng nhập
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toUpperCase())}
                  autoComplete="username"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? "🔓" : "🔒"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={loading}
              >
                Đăng nhập
              </Button>
              <Text fontSize="sm" color="gray.600">
                Chưa có tài khoản?{" "}
                <Link as={RouterLink} to={routePaths.register} color="blue.600">
                  Đăng ký
                </Link>
              </Text>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
