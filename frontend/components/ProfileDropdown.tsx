import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import FolderIcon from "@mui/icons-material/Folder";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const ProfileDropdown = ({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO: Replace with actual userId from context/auth
  const userId = "me";
  // Logout logic
  const logout = () => {
    // Clear tokens/session (example: localStorage)
    localStorage.removeItem("authToken");
    // Add any other session clearing logic here
    handleClose();
    onNavigate("/auth/login");
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-label="Profile"
        sx={{ ml: 2 }}
      >
        <Avatar src="/profile-icon.png" />
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: 220, borderRadius: 3 } }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle1" fontWeight={700}>
            Profile
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <MenuItem
          onClick={() => {
            handleClose();
            if (window.location.pathname !== `/profile/${userId}`) {
              onNavigate(`/profile/${userId}`);
            }
          }}
          sx={{ py: 1.2 }}
        >
          <PersonIcon sx={{ mr: 1 }} /> View Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/edit");
          }}
          sx={{ py: 1.2 }}
        >
          <EditIcon sx={{ mr: 1 }} /> Edit Profile
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/activity");
          }}
          sx={{ py: 1.2 }}
        >
          <BarChartIcon sx={{ mr: 1 }} /> User Activity
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/achievements");
          }}
          sx={{ py: 1.2 }}
        >
          <EmojiEventsIcon sx={{ mr: 1 }} /> Achievements
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/cases");
          }}
          sx={{ py: 1.2 }}
        >
          <FolderIcon sx={{ mr: 1 }} /> Your Cases
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/comments");
          }}
          sx={{ py: 1.2 }}
        >
          <CommentIcon sx={{ mr: 1 }} /> Your Comments
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/following");
          }}
          sx={{ py: 1.2 }}
        >
          <GroupIcon sx={{ mr: 1 }} /> Following
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onNavigate("/profile/liked");
          }}
          sx={{ py: 1.2 }}
        >
          <StarIcon sx={{ mr: 1 }} /> Liked Items
        </MenuItem>
        {/* Divider above logout */}
        <Divider sx={{ my: 1, bgcolor: "#fdecea" }} />
        <MenuItem
          onClick={logout}
          sx={{
            py: 1.2,
            color: "#d32f2f",
            fontWeight: 700,
            "&:hover": {
              bgcolor: "#fdecea",
              color: "#b71c1c",
              transition: "background 0.2s, color 0.2s",
            },
          }}
        >
          <span style={{ marginRight: 8, fontSize: 22 }}>🚪</span> Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
