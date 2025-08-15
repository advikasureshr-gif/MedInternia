import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f7fafc"
      textAlign="center"
      px={2}
    >
      <Image src="/404-illustration.svg" alt="404" width={300} height={200} />
      <Typography variant="h3" fontWeight={700} color="#2193b0" mb={2}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/"
        sx={{ borderRadius: 2, px: 4, py: 1 }}
      >
        Go Home
      </Button>
    </Box>
  );
}
