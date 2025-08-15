import React from "react";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
} from "@mui/material";

const webinars = [
  {
    id: 1,
    title: "Cardiac Emergencies",
    date: "2025-08-20",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Pediatric Neurology",
    date: "2025-08-10",
    status: "Completed",
  },
];

export default function WebinarsPage() {
  return (
    <Box maxWidth={700} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Webinars
        </Typography>
        <List>
          {webinars.map((w) => (
            <ListItem
              key={w.id}
              secondaryAction={<Button variant="outlined">View</Button>}
            >
              <ListItemText primary={w.title} secondary={w.date} />
              <Chip
                label={w.status}
                color={w.status === "Upcoming" ? "info" : "default"}
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
