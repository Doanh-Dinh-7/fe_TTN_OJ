import { Button, HStack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/controllers/AuthContext";
import { routePaths } from "@/routes/routePaths";
import type { AuthMenuProps } from "../controllers/types";

const headerButtonProps = {
  color: "white",
  borderColor: "whiteAlpha.400",
  _hover: { bg: "whiteAlpha.200", borderColor: "whiteAlpha.600", color: "white" },
} as const;

export function AuthMenu({ user, inHeader }: AuthMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate(routePaths.home);
  };
  if (user) {
    return (
      <HStack>
        <Text color={inHeader ? "white" : undefined} fontWeight="medium">
          {user.username}
        </Text>
        <Button
          size="sm"
          variant="outline"
          onClick={handleLogout}
          {...(inHeader ? headerButtonProps : {})}
        >
          Logout
        </Button>
      </HStack>
    );
  }
  return (
    <HStack>
      <Button
        as={RouterLink}
        to={routePaths.login}
        size="sm"
        variant={inHeader ? "outline" : "ghost"}
        {...(inHeader ? headerButtonProps : {})}
      >
        Login
      </Button>
      <Button
        as={RouterLink}
        to={routePaths.register}
        size="sm"
        colorScheme={inHeader ? "whiteAlpha" : "blue"}
        variant={inHeader ? "outline" : "solid"}
        borderColor={inHeader ? "white" : undefined}
        color={inHeader ? "white" : undefined}
        _hover={inHeader ? { bg: "whiteAlpha.300" } : undefined}
      >
        Register
      </Button>
    </HStack>
  );
}
