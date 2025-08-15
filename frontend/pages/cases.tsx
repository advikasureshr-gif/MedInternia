import React from "react";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const cases = [
  { id: 1, title: "Cardiology Case #1", status: "Reviewed" },
  { id: 2, title: "Neurology Case #2", status: "Pending" },
];

export default function AllCasesPage() {
  return (
    <Box maxWidth={700} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          All Cases
        </Typography>
        <List>
          {cases.map((c) => (
            <ListItem
              key={c.id}
              secondaryAction={<Button variant="outlined">View</Button>}
            >
              <ListItemText primary={c.title} secondary={c.status} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
