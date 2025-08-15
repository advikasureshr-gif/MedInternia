import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
// import Link from 'next/link';
import Link from "next/link";

import React, { useState } from "react";

const categories = ["All", "Cases", "Jobs", "Webinars", "Patients"];
const specialties = [
  "All",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
];
const difficulties = ["Beginner", "Intermediate", "Complex"];
const verifications = ["Verified", "Unverified"];
const sortOptions = ["Newest", "Oldest", "Most Upvoted"];

const HomePage = () => {
  // Leaderboard preview data
  const topContributors = [
    { name: "Dr. Smith", points: 320 },
    { name: "Dr. Lee", points: 290 },
    { name: "Dr. Patel", points: 270 },
  ];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [specialty, setSpecialty] = useState("All");
  const [difficulty, setDifficulty] = useState("");
  const [verification, setVerification] = useState("");
  const [sort, setSort] = useState("Newest");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e0eafc 0%, #f8f9fa 100%)",
        position: "relative",
        pb: { xs: 4, md: 8 },
      }}
    >
      {/* Hero Section with medical-themed background, search bar, improved typography, and CTA */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          pt: { xs: 7, md: 12 },
          pb: 2,
          mb: { xs: 2, md: 3 },
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Medical-themed SVG/gradient background */}
        <Box
          sx={{
            width: "100%",
            height: 140,
            mb: 2,
            background:
              "url('/medical-hero.svg'), linear-gradient(120deg, #e0eafc 0%, #d0f3fc 100%)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: 6,
            opacity: 0.7,
          }}
        />
        {/* Search bar centered above title */}
        <Box sx={{ maxWidth: 420, mx: "auto", mb: 3 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (search.trim())
                window.location.href = `/search?query=${encodeURIComponent(
                  search
                )}`;
            }}
            style={{ width: "100%", position: "relative" }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cases, jobs, webinars..."
              className="input-bar youtube-search"
              style={{
                paddingRight: 48,
                borderRadius: 24,
                border: "1px solid #b0c4de",
                height: 44,
                fontSize: "1.1rem",
                background: "#fff",
                boxShadow: "0 2px 8px rgba(33,147,176,0.08)",
                verticalAlign: "middle",
                margin: 0,
                paddingLeft: 22,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
            <Button
              type="submit"
              sx={{
                position: "absolute",
                right: 6,
                top: "50%",
                transform: "translateY(-50%)",
                minWidth: 0,
                p: 0.5,
                borderRadius: 20,
                background: "#f7fafc",
                boxShadow: "0 1px 4px rgba(33,147,176,0.08)",
              }}
            >
              <span
                className="material-icons"
                style={{ fontSize: 26, color: "#2193b0" }}
              >
                search
              </span>
            </Button>
          </form>
        </Box>
        <Typography
          variant="h1"
          fontWeight={900}
          color="#2193b0"
          mb={2}
          sx={{ letterSpacing: 1, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          Med-Internia
        </Typography>
        <Typography
          variant="h6"
          color="#555"
          mb={4}
          sx={{ fontWeight: 400, fontSize: { xs: "1.1rem", md: "1.3rem" } }}
        >
          Your gateway to medical learning, jobs, and opportunities.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 30,
            px: 5,
            py: 1.5,
            fontWeight: 700,
            fontSize: "1.2rem",
            background: "linear-gradient(90deg, #1de9b6 0%, #2193b0 100%)",
            boxShadow: "0 4px 24px #2193b044",
            transition: "transform 0.2s",
            mb: 2,
            "&:hover": {
              transform: "scale(1.07)",
              boxShadow: "0 8px 32px #2193b066",
              background: "linear-gradient(90deg, #2193b0 0%, #1de9b6 100%)",
            },
          }}
          href="/auth/register"
        >
          Get Started
        </Button>
      </Box>
      {/* 4 Main Cards Section (Cases, Jobs, Webinars, Leaderboard) */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: 2,
          py: 2,
          mb: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          <CardLink
            href="/cases"
            title="Cases"
            icon={
              <span style={{ fontSize: 48 }} role="img" aria-label="Cases">
                📂
              </span>
            }
            desc="Explore and analyze real medical cases."
          />
          <CardLink
            href="/jobs"
            title="Jobs"
            icon={
              <span style={{ fontSize: 48 }} role="img" aria-label="Jobs">
                💼
              </span>
            }
            desc="Find internships and opportunities."
          />
          <CardLink
            href="/webinars"
            title="Webinars"
            icon={
              <span style={{ fontSize: 48 }} role="img" aria-label="Webinars">
                🎤
              </span>
            }
            desc="Join live AMAs and sessions."
          />
          <CardLink
            href="/leaderboard"
            title="Leaderboard"
            icon={
              <span
                style={{ fontSize: 48 }}
                role="img"
                aria-label="Leaderboard"
              >
                🏆
              </span>
            }
            desc="Track contributors and ranks."
          />
        </Stack>
      </Box>
      {/* Leaderboard Preview Section */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          py: 4,
          mb: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} color="#1565c0">
          Top Contributors
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {topContributors.map((c, i) => (
            <Paper
              key={i}
              elevation={2}
              sx={{
                px: 3,
                py: 2,
                borderRadius: 3,
                minWidth: 120,
                textAlign: "center",
                background: "#e0eafc",
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} color="#2193b0">
                {c.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.points} pts
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
      {/* Features Section */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          py: 4,
          mb: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} color="#1565c0">
          Why Med-Internia?
        </Typography>
        <ul
          style={{ fontSize: "1.1rem", marginLeft: "2rem", marginBottom: 24 }}
        >
          <li>Case-based learning and analysis</li>
          <li>Peer review and feedback system</li>
          <li>Badges and certification achievements</li>
          <li>Job opportunities board</li>
          <li>Webinars and live AMAs</li>
          <li>AI-powered suggestions</li>
          <li>Leaderboard and advanced search</li>
          <li>LinkedIn/GitHub export, video conferencing</li>
        </ul>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Link href="/auth/login" passHref legacyBehavior>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 4,
                fontWeight: 600,
                background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
                boxShadow: "0 2px 12px #2193b044",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 24px #2193b066",
                },
              }}
            >
              Login
            </Button>
          </Link>
          <Link href="/auth/register" passHref legacyBehavior>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 4,
                fontWeight: 600,
                background: "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)",
                boxShadow: "0 2px 12px #2193b044",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 24px #2193b066",
                },
              }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Box>
      {/* How it works / Testimonials Section */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          py: 4,
          mb: { xs: 4, md: 6 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} color="#1565c0">
          How It Works
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              flex: 1,
              minWidth: 220,
            }}
          >
            <Typography variant="h6" fontWeight={700} color="#2193b0" mb={1}>
              Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your free account and set up your medical profile.
            </Typography>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              flex: 1,
              minWidth: 220,
            }}
          >
            <Typography variant="h6" fontWeight={700} color="#2193b0" mb={1}>
              Learn & Collaborate
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join cases, webinars, and discussions to learn and share
              knowledge.
            </Typography>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              flex: 1,
              minWidth: 220,
            }}
          >
            <Typography variant="h6" fontWeight={700} color="#2193b0" mb={1}>
              Grow Your Career
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Earn achievements, connect with peers, and find job opportunities.
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
  // CardLink component for homepage cards
  function CardLink({
    href,
    title,
    icon,
    desc,
  }: {
    href: string;
    title: string;
    icon: React.ReactNode;
    desc: string;
  }) {
    return (
      <Link href={href} passHref legacyBehavior>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 4,
            minWidth: 220,
            flex: 1,
            textAlign: "center",
            transition: "box-shadow 0.2s, transform 0.2s",
            cursor: "pointer",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            "&:hover": {
              boxShadow: 12,
              background: "#e0eafc",
              transform: "scale(1.04)",
              filter: "drop-shadow(0 0 12px #2193b044)",
            },
          }}
        >
          <Box
            mb={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            color="#2193b0"
            mb={0.5}
            sx={{ fontSize: "1.25rem" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={1}
            sx={{ minHeight: 32 }}
          >
            {desc}
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
              color: "#fff",
              boxShadow: "0 1px 4px #2193b022",
              mt: 1,
              "&:hover": {
                background: "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)",
                color: "#fff",
                boxShadow: "0 2px 8px #2193b044",
              },
            }}
          >
            Explore
          </Button>
        </Paper>
      </Link>
    );
  }
};

export default HomePage;
