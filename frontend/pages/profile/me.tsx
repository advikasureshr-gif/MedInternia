import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Chip,
  Button,
  Divider,
} from "@mui/material";

export default function MeProfilePage() {
  return (
    <Box maxWidth={700} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src="/profile-icon.png" sx={{ width: 72, height: 72 }} />
          <Box>
            <Typography variant="h4" fontWeight={700} mb={1}>
              Welcome, Dr. Me!
            </Typography>
            <Chip
              label="Verified"
              color="success"
              sx={{ fontWeight: 600, mb: 1 }}
            />
            <Typography variant="body1" color="text.secondary">
              "Striving for excellence in every case."
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Quick Actions
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained" href="/profile/edit">
              Edit Profile
            </Button>
            <Button variant="outlined" href="/profile/achievements">
              Achievements
            </Button>
            <Button variant="outlined" href="/profile/cases">
              My Cases
            </Button>
            <Button variant="outlined" href="/profile/comments">
              My Comments
            </Button>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" fontWeight={600} mb={2}>
            About You
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Institute: MedInternia University
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Year: 2025
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Profession: Intern
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Bio: Passionate about learning and helping others.
          </Typography>
        </Box>
      </Card>
      <Card sx={{ p: 4, borderRadius: 4, background: "#f8f9fa" }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recent Achievements
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip
            icon={
              <span className="material-icons" style={{ color: "#FFD700" }}>
                emoji_events
              </span>
            }
            label="Champion"
            color="warning"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            icon={
              <span className="material-icons" style={{ color: "#2193b0" }}>
                star
              </span>
            }
            label="Expert Reviewer"
            color="primary"
            sx={{ fontWeight: 600 }}
          />
          <Chip
            icon={
              <span className="material-icons" style={{ color: "#6dd5ed" }}>
                trending_up
              </span>
            }
            label="Growth Master"
            sx={{ fontWeight: 600, bgcolor: "#e0eafc" }}
          />
        </Box>
      </Card>
    </Box>
  );
}
