import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const notifications = [
  {
    id: 1,
    type: "mention",
    icon: <ChatBubbleIcon color="primary" />,
    message: "You were mentioned in a case discussion.",
    timestamp: "2h ago",
    group: "Today",
    unread: true,
  },
  {
    id: 2,
    type: "system",
    icon: <CheckCircleIcon color="success" />,
    message: "Your profile was verified.",
    timestamp: "5h ago",
    group: "Today",
    unread: false,
  },
  {
    id: 3,
    type: "update",
    icon: <NotificationsIcon color="info" />,
    message: "System update completed.",
    timestamp: "Yesterday",
    group: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    type: "mention",
    icon: <ChatBubbleIcon color="primary" />,
    message: "You were mentioned in a webinar chat.",
    timestamp: "2 days ago",
    group: "Earlier",
    unread: true,
  },
];

const groupOrder = ["Today", "Yesterday", "Earlier"];
const filterOptions = ["All", "Unread", "Mentions", "System Updates"];

export default function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [allRead, setAllRead] = useState(false);

  // Filter logic
  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return n.unread;
    if (filter === "Mentions") return n.type === "mention";
    if (filter === "System Updates")
      return n.type === "system" || n.type === "update";
    return true;
  });

  // Group notifications
  const grouped = groupOrder
    .map((group) => ({
      group,
      items: filtered.filter((n) => n.group === group),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight={800} color="#1565c0">
          Notifications
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
          }}
          onClick={() => setAllRead(true)}
        >
          Mark All as Read
        </Button>
      </Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 140, borderRadius: 2, fontWeight: 500 }}
        >
          {filterOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {grouped.map((group, idx) => (
        <Box key={group.group} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            color="#2193b0"
            sx={{ mb: 1 }}
          >
            {group.group}
          </Typography>
          <Stack spacing={2}>
            {group.items.map((n) => (
              <Paper
                key={n.id}
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 2px 12px #2193b022",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: n.unread && !allRead ? "#e3f2fd" : "#fff",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 6px 24px #2193b044",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box sx={{ fontSize: 28 }}>{n.icon}</Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: n.unread && !allRead ? 700 : 500 }}
                  >
                    {n.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {n.timestamp}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
          {idx < grouped.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
      {grouped.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 6, textAlign: "center" }}>
          No notifications found.
        </Typography>
      )}
    </Container>
  );
}
