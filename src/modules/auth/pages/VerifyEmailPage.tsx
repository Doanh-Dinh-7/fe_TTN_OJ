import { useEffect, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { authService } from "@/modules/auth/services/authService";
import { routePaths } from "@/routes/routePaths";
import { Status } from "../controllers/types";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>(token ? "loading" : "error");
  const [message, setMessage] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Thiếu link xác thực. Vui lòng dùng đúng link từ email.");
      return;
    }
    let cancelled = false;
    authService
      .verifyEmail(token)
      .then((res) => {
        if (!cancelled) {
          setStatus("success");
          setMessage(res.message || "Email đã được xác thực.");
          toast({ title: "Xác thực thành công", status: "success" });
        }
      })
      .catch((err: { response?: { data?: { message?: string } } }) => {
        if (!cancelled) {
          setStatus("error");
          const msg =
            err.response?.data?.message || "Link không hợp lệ hoặc đã hết hạn.";
          setMessage(msg);
          toast({ title: msg, status: "error" });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token, toast]);

  return (
    <Box maxW="md" mx="auto" py={8}>
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>
            Xác thực email
          </Heading>
          {status === "loading" && (
            <Box textAlign="center" py={6}>
              <Spinner size="lg" />
              <Text mt={3}>Đang xác thực...</Text>
            </Box>
          )}
          {status === "success" && (
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Xác thực thành công</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Box>
            </Alert>
          )}
          {status === "error" && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Xác thực thất bại</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Box>
            </Alert>
          )}
          {(status === "success" || status === "error") && (
            <Button
              as={RouterLink}
              to={routePaths.login}
              colorScheme="blue"
              w="full"
              mt={4}
            >
              Đi đến trang đăng nhập
            </Button>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}
