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

const jobs = [
  { id: 1, title: "Internship: Cardiology", location: "Delhi", status: "Open" },
  { id: 2, title: "Resident: Neurology", location: "Mumbai", status: "Closed" },
];

export default function JobsPage() {
  return (
    <Box maxWidth={700} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Job Opportunities
        </Typography>
        <List>
          {jobs.map((j) => (
            <ListItem
              key={j.id}
              secondaryAction={
                <Button variant="contained" disabled={j.status !== "Open"}>
                  Apply
                </Button>
              }
            >
              <ListItemText primary={j.title} secondary={j.location} />
              <Chip
                label={j.status}
                color={j.status === "Open" ? "success" : "default"}
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
