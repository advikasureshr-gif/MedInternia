import React from "react";
import { Card, Chip, Button, Avatar, Box, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

interface SearchResultCardProps {
  title: string;
  summary: string;
  specialty: string;
  difficulty: string;
  points: number;
  postedBy: string;
  verified: boolean;
  isEvent?: boolean;
  onViewDetails: () => void;
  onJoinLive?: () => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  title,
  summary,
  specialty,
  difficulty,
  points,
  postedBy,
  verified,
  isEvent,
  onViewDetails,
  onJoinLive,
}) => (
  <Card
    sx={{
      borderRadius: 3,
      boxShadow: 2,
      p: 2,
      mb: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      background: "#fff",
    }}
  >
    <Typography variant="h6" fontWeight={700} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      {summary}
    </Typography>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
      <Chip label={specialty} color="primary" size="small" />
      <Chip label={difficulty} color="secondary" size="small" />
      <Chip label={`+${points} Points`} color="success" size="small" />
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Avatar sx={{ width: 24, height: 24 }}>{postedBy[0]}</Avatar>
      <Typography variant="body2">Posted by: {postedBy}</Typography>
      {verified && (
        <VerifiedIcon color="primary" fontSize="small" titleAccess="Verified" />
      )}
    </Box>
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onViewDetails}
      >
        View Details
      </Button>
      {isEvent && (
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={onJoinLive}
        >
          Join Live Session
        </Button>
      )}
    </Box>
  </Card>
);

export default SearchResultCard;
