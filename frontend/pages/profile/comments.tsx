import React from "react";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

const comments = [
  { id: 1, text: "Great case study!", date: "2025-08-15" },
  { id: 2, text: "Very informative webinar.", date: "2025-08-14" },
];

export default function CommentsPage() {
  return (
    <Box maxWidth={600} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          My Comments
        </Typography>
        <List>
          {comments.map((c) => (
            <ListItem
              key={c.id}
              secondaryAction={
                <IconButton color="primary">
                  <CommentIcon />
                </IconButton>
              }
            >
              <ListItemText primary={c.text} secondary={c.date} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
