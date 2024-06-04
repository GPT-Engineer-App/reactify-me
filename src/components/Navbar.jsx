import { Box, Flex, Link, Spacer, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Navbar = () => {
  const { logout } = useSupabaseAuth();

  return (
    <Box bg="teal.500" p={4}>
      <Flex maxW="container.md" mx="auto" align="center">
        <Text fontSize="xl" color="white" fontWeight="bold">
          My Website
        </Text>
        <Spacer />
        <Flex>
          <Link as={RouterLink} to="/" color="white" mx={2}>
            Home
          </Link>
          <Link as={RouterLink} to="/events" color="white" mx={2}>
            Events
          </Link>
          <Button colorScheme="teal" variant="outline" mx={2} onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;