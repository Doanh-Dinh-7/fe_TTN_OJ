import { Outlet } from "react-router-dom";
import {
  Box,
  Container,
  HStack,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/controllers/AuthContext";
import { AuthMenu } from "@/modules/auth";
import { routePaths } from "@/routes/routePaths";

export function MainLayout() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const { user } = useAuth();
  const logo =
    "https://res.cloudinary.com/din9j0vkz/image/upload/v1772634577/logo_white_xkr7ny.png";
  const banner =
    "https://res.cloudinary.com/din9j0vkz/image/upload/v1772634568/banner_dldokt.png";

  return (
    <Box minH="100vh" bg={bg}>
      <Box
        as="header"
        position="relative"
        py={3}
        px={4}
        bgImage={banner}
        bgSize="cover"
        bgPosition="center"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.700"
          backdropFilter="blur(2px)"
          _dark={{ bg: "whiteAlpha.700" }}
        />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <HStack justify="space-between">
            <Box display="flex" alignItems="center" gap={1} cursor="pointer">
              <Link
                as={RouterLink}
                to={routePaths.home}
                color="white"
                _hover={{ color: "whiteAlpha.900" }}
                display="flex"
                alignItems="center"
              >
                <Image
                  src={logo}
                  alt="TTN OJ"
                  objectFit="cover"
                  height={10}
                  width="auto"
                  maxW={8}
                  rounded="md"
                />
                <Text
                  as="span"
                  fontFamily="Paris2024, sans-serif"
                  fontWeight="bold"
                  fontSize="xl"
                  lineHeight="none"
                  color="white"
                >
                  TTN-OJ
                  <br />
                  TechTonic Online Judge
                </Text>
              </Link>
            </Box>
            <HStack gap={4}>
              <Link
                as={RouterLink}
                to={routePaths.contests}
                color="white"
                fontWeight="medium"
                _hover={{
                  color: "whiteAlpha.900",
                  textDecoration: "underline",
                }}
              >
                Contests
              </Link>
              <AuthMenu user={user} inHeader />
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Container maxW="container.xl" py={6}>
        <Outlet />
      </Container>
    </Box>
  );
}
