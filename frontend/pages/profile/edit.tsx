import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Avatar,
} from "@mui/material";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    name: "Dr. Me",
    bio: "Passionate about medicine.",
    email: "me@medinternia.com",
    image: "",
  });
  return (
    <Box maxWidth={600} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            src={form.image || "/profile-icon.png"}
            sx={{ width: 64, height: 64 }}
          />
          <Typography variant="h5" fontWeight={700}>
            Edit Profile
          </Typography>
        </Box>
        <TextField
          label="Name"
          fullWidth
          sx={{ mb: 2 }}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Bio"
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 2 }}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Card>
    </Box>
  );
}
