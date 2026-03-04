import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useAuth } from "@/controllers/AuthContext";
import { routePaths } from "@/routes/routePaths";

const MIN_PASSWORD_LENGTH = 8;

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register } = useAuth();
  const toast = useToast();

  const passwordValid = password.length >= MIN_PASSWORD_LENGTH;
  const passwordError = password.length > 0 && !passwordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !username.trim() || !password) {
      toast({
        title: "Nhập đầy đủ email, username và mật khẩu",
        status: "warning",
      });
      return;
    }
    if (!passwordValid) {
      toast({
        title: `Mật khẩu cần ít nhất ${MIN_PASSWORD_LENGTH} ký tự`,
        status: "warning",
      });
      return;
    }
    setLoading(true);
    try {
      await register(email.trim(), password, username.trim());
      setRegistered(true);
      toast({ title: "Đăng ký thành công", status: "success" });
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Đăng ký thất bại";
      toast({ title: message || "Đăng ký thất bại", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <Box maxW="md" mx="auto" py={8}>
        <Card>
          <CardBody>
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Kiểm tra email</AlertTitle>
                <AlertDescription>
                  Chúng tôi đã gửi link xác thực đến <strong>{email}</strong>.
                  Vui lòng mở email và bấm link để kích hoạt tài khoản (link hết
                  hạn sau 15 phút). Sau khi xác thực, bạn có thể đăng nhập bằng
                  username và mật khẩu.
                </AlertDescription>
              </Box>
            </Alert>
            <Button
              as={RouterLink}
              to={routePaths.login}
              colorScheme="blue"
              w="full"
              mt={4}
            >
              Đi đến trang đăng nhập
            </Button>
          </CardBody>
        </Card>
      </Box>
    );
  }

  return (
    <Box maxW="md" mx="auto" py={8}>
      <Card>
        <CardHeader>
          <Heading size="md" textAlign="center">
            Đăng ký tài khoản
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.trim().toUpperCase())
                  }
                  autoComplete="username"
                />
              </FormControl>
              <FormControl isRequired isInvalid={passwordError}>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={`Ít nhất ${MIN_PASSWORD_LENGTH} ký tự`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
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
                <FormHelperText>
                  {passwordValid
                    ? "✓ Đủ độ dài"
                    : `Cần ít nhất ${MIN_PASSWORD_LENGTH} ký tự`}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={loading}
              >
                Đăng ký
              </Button>
              <Text fontSize="sm" color="gray.600">
                Đã có tài khoản?{" "}
                <Link as={RouterLink} to={routePaths.login} color="blue.600">
                  Đăng nhập
                </Link>
              </Text>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}
