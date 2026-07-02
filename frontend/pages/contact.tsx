// GSSoC: Replaced MUI icons with Lucide SVG icons
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Mail, Phone, Hospital, Home, Search } from "lucide-react";
import { Box, Button, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getLoginHref, protectedLandingPaths } from "../utils/authRedirect";

export default function ContactPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, []);

  const getAuthAwareHref = (path: string) =>
    !isLoggedIn && protectedLandingPaths.includes(path) ? getLoginHref(path) : path;

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.push('/')}>
          <Image src="/med-internia-logo.jpg" alt="MedInternia Logo" width={36} height={36} style={{ borderRadius: '50%' }} />
          <Typography variant="h6" fontWeight={800} color="#1a202c" ml={1}>MedInternia</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
          {(isLoggedIn ? ['Cases', 'Jobs', 'Webinars', 'Leaderboard', 'About'] : ['Jobs', 'Webinars', 'Leaderboard', 'About']).map((item) => (
            <Link key={item} href={getAuthAwareHref(`/${item.toLowerCase()}`)} passHref legacyBehavior>
              <Typography component="a" fontWeight={600} color="#4a5568" sx={{ textDecoration: 'none', transition: 'all 0.2s', '&:hover': { color: '#0072ff', borderBottom: 'none !important', textDecoration: 'none' } }}>{item}</Typography>
            </Link>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <IconButton size="small"><Search size={20} color="#4a5568" /></IconButton>
          <Button variant="text" sx={{ color: '#0072ff', fontWeight: 700, display: { xs: 'none', sm: 'inline-flex' }, '&:hover': { bgcolor: 'rgba(0,114,255,0.08)' } }} onClick={() => router.push('/auth/login')}>Log in</Button>
          <Button variant="contained" sx={{ bgcolor: '#0072ff', color: '#fff', borderRadius: '24px', px: { xs: 2, sm: 3 }, fontWeight: 700, textTransform: 'none', boxShadow: '0 4px 14px rgba(0,114,255,0.2)', '&:hover': { bgcolor: '#005bb5', boxShadow: '0 6px 20px rgba(0,114,255,0.3)', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease-in-out' }} onClick={() => router.push('/auth/register')}>Sign Up</Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(120deg, #e0eafc 0%, #f8f9fa 100%)",
          display: "flex",
          alignItems: "center",
          overflowX: "hidden",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg" sx={{ width: "100%", px: { xs: 3, sm: 4 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 8 }}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: 320, sm: 520 },
                minWidth: 0,
              }}
            >
              <Typography
                variant="h2"
                fontWeight={900}
                color="#0072ff"
                sx={{
                  fontSize: { xs: "2.2rem", sm: "3rem", md: "4.5rem" },
                  lineHeight: 1.05,
                  overflowWrap: "anywhere",
                  maxWidth: "100%",
                }}
              >
                Contact MedInternia
              </Typography>
              <Typography
                variant="h5"
                color="#555"
                sx={{
                  mt: 3,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  fontSize: { xs: "1.1rem", sm: "1.35rem", md: "1.5rem" },
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordBreak: "normal",
                }}
              >
                Reach the team for platform support, collaboration queries, and medical learning opportunities.
              </Typography>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                aria-label="Back to Home"
                startIcon={<Home size={18} />}
                sx={{
                  mt: 4,
                  borderRadius: 30,
                  px: 4,
                  py: 1.4,
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #1de9b6 0%, #0072ff 100%)",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px 0 rgba(33,147,176,0.18)",
                  borderBottom: "none !important",
                  transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #0072ff 0%, #1de9b6 100%)",
                    transform: "scale(1.04)",
                    boxShadow: "0 6px 20px 0 rgba(33,147,176,0.28)",
                    color: "#ffffff",
                    borderBottom: "none !important",
                  },
                }}
              >
                Return to Dashboard
              </Button>
            </Box>

            {/* GSSoC: card-enter adds fade-in-up entrance animation */}
            <Paper
              elevation={6}
              className="card-enter"
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                boxSizing: "border-box",
                borderRadius: 5,
                width: "100%",
                maxWidth: { xs: 320, sm: 500 },
                textAlign: "left",
                boxShadow: "0 12px 36px rgba(33,147,176,0.18)",
                border: "1px solid rgba(33,147,176,0.12)",
              }}
            >
              <Stack spacing={3}>
                {/* GSSoC: Lucide Hospital icon replaces MUI LocalHospitalIcon */}
                <Box>
                  <Hospital size={42} color="#0072ff" style={{ marginBottom: 8 }} />
                  <Typography variant="h4" fontWeight="bold">
                    We are here to help
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    Send us a message and the MedInternia team will get back to you.
                  </Typography>
                </Box>

                {/* GSSoC: Lucide Mail icon replaces MUI EmailIcon; aria-label added */}
                <Box
                  role="group"
                  aria-label="Email contact"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(33,147,176,0.08)",
                    boxSizing: "border-box",
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <Mail size={22} color="#0072ff" aria-hidden="true" />
                  <Typography
                    component="a"
                    href="mailto:medinternia@gmail.com"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: 600,
                      overflowWrap: "anywhere",
                      minWidth: 0,
                    }}
                  >
                    medinternia@gmail.com
                  </Typography>
                </Box>

                {/* GSSoC: Lucide Phone icon replaces MUI PhoneIcon; aria-label added */}
                <Box
                  role="group"
                  aria-label="Phone contact"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(33,147,176,0.08)",
                    boxSizing: "border-box",
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <Phone size={22} color="#0072ff" aria-hidden="true" />
                  <Typography
                    component="a"
                    href="tel:8585858585"
                    sx={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
                  >
                    8585858585
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
