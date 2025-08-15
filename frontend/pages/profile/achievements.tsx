import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip,
  Modal,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CelebrationIcon from "@mui/icons-material/Celebration";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LockIcon from "@mui/icons-material/Lock";

type Achievement = {
  id: number;
  name: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
  date: string | null;
  description: string;
  nextTier: string;
};

const achievements: Achievement[] = [
  {
    id: 1,
    name: "Champion",
    icon: <EmojiEventsIcon sx={{ color: "gold" }} />,
    progress: 80,
    unlocked: true,
    date: "2025-07-10",
    description: "Awarded for top leaderboard position.",
    nextTier: "Win 5 more cases to reach Grand Champion.",
  },
  {
    id: 2,
    name: "Expert Reviewer",
    icon: <StarIcon sx={{ color: "#2193b0" }} />,
    progress: 60,
    unlocked: true,
    date: "2025-06-20",
    description: "Reviewed 50+ cases.",
    nextTier: "Review 50 more cases for Master Reviewer.",
  },
  {
    id: 3,
    name: "Growth Master",
    icon: <TrendingUpIcon sx={{ color: "#6dd5ed" }} />,
    progress: 30,
    unlocked: false,
    date: null,
    description: "Reach 1000 points.",
    nextTier: "Earn 700 more points.",
  },
  {
    id: 4,
    name: "Quiz Pro",
    icon: <CelebrationIcon sx={{ color: "#ff9800" }} />,
    progress: 100,
    unlocked: true,
    date: "2025-08-01",
    description: "Completed 100 quizzes.",
    nextTier: "Complete 200 quizzes for Quiz Legend.",
  },
  {
    id: 5,
    name: "Community Helper",
    icon: <GroupIcon sx={{ color: "#43a047" }} />,
    progress: 50,
    unlocked: false,
    date: null,
    description: "Help 50 peers in discussions.",
    nextTier: "Help 50 more peers for Community Star.",
  },
];

export default function AchievementsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = (ach: Achievement) => {
    setSelected(ach);
    setModalOpen(true);
    if (ach.unlocked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelected(null);
    setShowConfetti(false);
  };
  // Share achievement (dummy)
  const handleShare = () => {
    alert("Achievement shared!");
  };

  return (
    <Box px={2} py={3}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Achievements
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {achievements.map((ach) => (
          <Tooltip
            key={ach.id}
            title={ach.unlocked ? "View details" : `Locked: ${ach.nextTier}`}
          >
            <Card
              onClick={() => ach.unlocked && handleOpen(ach)}
              sx={{
                cursor: ach.unlocked ? "pointer" : "not-allowed",
                borderRadius: 6,
                boxShadow: ach.unlocked ? "0 2px 16px #2193b044" : "none",
                opacity: ach.unlocked ? 1 : 0.5,
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
                background: ach.unlocked
                  ? "linear-gradient(120deg, #fff 80%, #e0eafc 100%)"
                  : "#f7fafc",
                "&:hover": ach.unlocked
                  ? {
                      transform: "scale(1.06)",
                      boxShadow: "0 8px 32px #2193b066",
                      filter: "drop-shadow(0 0 16px #6dd5ed66)",
                    }
                  : {},
                minHeight: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center", width: "100%" }}>
                <Box mb={1}>
                  {ach.icon}
                  {!ach.unlocked && <LockIcon sx={{ color: "#bbb", ml: 1 }} />}
                </Box>
                <Typography variant="h6" fontWeight={600} mb={0.5}>
                  {ach.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={ach.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mb: 1,
                    background: "#e0eafc",
                    transition: "width 0.8s cubic-bezier(.4,2,.3,1)",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {ach.unlocked ? `${ach.progress}% to next tier` : "Locked"}
                </Typography>
              </CardContent>
              {/* Glow effect for unlocked */}
              {ach.unlocked && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    borderRadius: 6,
                    boxShadow: "0 0 24px 2px #6dd5ed33",
                  }}
                />
              )}
            </Card>
          </Tooltip>
        ))}
      </Box>
      {/* Modal for achievement details */}
      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            minWidth: 320,
            maxWidth: 400,
            textAlign: "center",
          }}
        >
          {showConfetti && selected?.unlocked && (
            <CelebrationIcon
              sx={{
                fontSize: 48,
                color: "#ff9800",
                mb: 2,
                animation: "confetti 1s linear",
              }}
            />
          )}
          {selected && (
            <>
              <Box mb={2} textAlign="center">
                {selected.icon}
                <Typography variant="h5" fontWeight={700} mt={1}>
                  {selected.name}
                </Typography>
              </Box>
              <Typography variant="body1" mb={1}>
                {selected.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {selected.date
                  ? `Unlocked on ${selected.date}`
                  : "Not unlocked yet"}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={selected.progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  mb: 2,
                  background: "#e0eafc",
                  transition: "width 0.8s cubic-bezier(.4,2,.3,1)",
                }}
              />
              <Typography variant="body2" fontWeight={600} mb={2}>
                Next Tier: {selected.nextTier}
              </Typography>
              {selected.unlocked && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleShare}
                  sx={{ mt: 1 }}
                >
                  Share Achievement
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
      {/* Mobile wrap fix */}
      <style>{`
        @media (max-width: 600px) {
          .MuiGrid-container {
            flex-wrap: wrap !important;
          }
        }
        @keyframes confetti {
          0% { opacity: 0; transform: scale(0.5) rotate(-30deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(10deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(30deg); }
        }
      `}</style>
    </Box>
  );
}
