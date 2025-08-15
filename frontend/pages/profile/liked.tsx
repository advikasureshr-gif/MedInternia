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
import StarIcon from "@mui/icons-material/Star";

const likedItems = [
  { id: 1, title: "Webinar: Cardiac Emergencies" },
  { id: 2, title: "Case: Pediatric Neurology" },
];

export default function LikedPage() {
  return (
    <Box maxWidth={600} mx="auto" my={4}>
      <Card sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Liked Items
        </Typography>
        <List>
          {likedItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton color="warning">
                  <StarIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
