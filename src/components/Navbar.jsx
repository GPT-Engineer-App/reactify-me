import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
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
          <Link as={RouterLink} to="/about" color="white" mx={2}>
            About
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;