import React from "react";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";

const following = [
  { id: 1, name: "Dr. Smith", avatar: "", specialty: "Cardiology" },
  { id: 2, name: "Dr. Lee", avatar: "", specialty: "Neurology" },
];

export default function FollowingPage() {
  return (
    <Box maxWidth={600} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Following
        </Typography>
        <List>
          {following.map((f) => (
            <ListItem
              key={f.id}
              secondaryAction={<Button variant="outlined">View Profile</Button>}
            >
              <Avatar src={f.avatar || "/profile-icon.png"} sx={{ mr: 2 }} />
              <ListItemText primary={f.name} secondary={f.specialty} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
