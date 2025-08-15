import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Box,
  TextField,
  LinearProgress,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    institute: "",
    year: "",
    profession: "",
    internAt: "",
    address: "",
    bio: "",
    image: "",
    points: 120,
    badgeProgress: 70,
  });

  return (
    <Box maxWidth={800} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={userInfo.image || "/profile-icon.png"}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Doctor Profile
              </Typography>
              <Chip
                label={`Points: ${userInfo.points}`}
                color="primary"
                sx={{ mt: 1 }}
              />
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">Badge Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={userInfo.badgeProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel Edit" : "Edit Info"}
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              View Activity
            </Button>
            <Button variant="outlined">Edit Files</Button>
          </Box>
        </Box>
        {/* Recent Achievements */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
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
        </Box>
        {/* Quick Links */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Quick Links
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              href="/profile/achievements"
              startIcon={<span className="material-icons">emoji_events</span>}
            >
              Achievements
            </Button>
            <Button
              variant="outlined"
              href="/profile/cases"
              startIcon={<span className="material-icons">folder</span>}
            >
              Cases
            </Button>
            <Button
              variant="outlined"
              href="/profile/comments"
              startIcon={<span className="material-icons">comment</span>}
            >
              Comments
            </Button>
            <Button
              variant="outlined"
              href="/profile/activity"
              startIcon={<span className="material-icons">bar_chart</span>}
            >
              Activity
            </Button>
          </Box>
        </Box>
        {/* Contact & Social */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Contact & Social
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="text"
              startIcon={<span className="material-icons">email</span>}
            >
              Email
            </Button>
            <Button
              variant="text"
              startIcon={<span className="material-icons">linkedin</span>}
            >
              LinkedIn
            </Button>
            <Button
              variant="text"
              startIcon={<span className="material-icons">code</span>}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Card>
      <Card sx={{ p: 4, borderRadius: 4, background: "#f8f9fa" }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          User Information
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            label="Institute"
            fullWidth
            value={userInfo.institute}
            disabled={!editMode}
            onChange={(e) =>
              setUserInfo({ ...userInfo, institute: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Year"
            fullWidth
            value={userInfo.year}
            disabled={!editMode}
            onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Profession"
            fullWidth
            value={userInfo.profession}
            disabled={!editMode}
            onChange={(e) =>
              setUserInfo({ ...userInfo, profession: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Intern At"
            fullWidth
            value={userInfo.internAt}
            disabled={!editMode}
            onChange={(e) =>
              setUserInfo({ ...userInfo, internAt: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Address"
            fullWidth
            value={userInfo.address}
            disabled={!editMode}
            onChange={(e) =>
              setUserInfo({ ...userInfo, address: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Bio"
            fullWidth
            multiline
            minRows={2}
            value={userInfo.bio}
            disabled={!editMode}
            onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
            sx={{ mb: 2 }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;
