import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Paper,
  Divider,
  useMediaQuery,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import FilterListIcon from "@mui/icons-material/FilterList";
import CategoryIcon from "@mui/icons-material/Category";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileDropdown from "./ProfileDropdown";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar({ route }: { route?: string }) {
  const router = useRouter();
  // More dropdown state
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const moreOpen = Boolean(moreAnchorEl);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };
  // Active nav button underline
  const navActive = (path: string) => ({
    fontWeight: 600,
    borderBottom: router.pathname === path ? "2px solid #2193b0" : "none",
    borderRadius: 0,
    mx: 1,
    px: 2,
    color: router.pathname === path ? "#2193b0" : undefined,
  });
  // Recent searches and suggestions
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([
    "Cardiology",
    "Internships",
    "Webinar on Diabetes",
  ]);
  const [search, setSearch] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  // Keyboard shortcut: focus search on '/'
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <>
      <AppBar
        sx={{
          background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
          zIndex: 1201,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap", minHeight: 64, px: { xs: 1, md: 3 } }}>
          <IconButton color="inherit" component={Link} href="/" sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: 1, mr: 2 }}
          >
            Med-Internia
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            {/* Desktop search bar */}
            <Box
              sx={{
                width: "100%",
                maxWidth: 420,
                position: "relative",
                display: { xs: "none", md: "block" },
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault(); /* handleSearch logic here */
                }}
                autoComplete="off"
                style={{ width: "100%" }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(search.length > 0)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Search medical cases, jobs, or webinars…"
                  aria-label="Search medical content"
                  style={{
                    width: "100%",
                    borderRadius: 24,
                    border: "1px solid #b0c4de",
                    height: 44,
                    fontSize: "1.08rem",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(33,147,176,0.10)",
                  }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background:
                      "linear-gradient(90deg, #1de9b6 0%, #2193b0 100%)",
                    borderRadius: "50%",
                    boxShadow: "0 2px 8px #2193b044",
                    width: 40,
                    height: 40,
                    p: 0,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: "0 4px 16px #2193b066",
                      background:
                        "linear-gradient(90deg, #2193b0 0%, #1de9b6 100%)",
                    },
                  }}
                  aria-label="Search medical content"
                  title="Search"
                >
                  <SearchIcon sx={{ color: "#fff", fontSize: 22 }} />
                </IconButton>
                {/* Suggestions dropdown */}
                {showSuggestions && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: 44,
                      left: 0,
                      width: "100%",
                      zIndex: 10,
                      borderRadius: 3,
                      boxShadow: "0 4px 16px #2193b044",
                      mt: 1,
                      p: 1,
                    }}
                  >
                    <Box
                      sx={{ mb: 1, px: 1, fontWeight: 600, color: "#1565c0" }}
                    >
                      Recent Searches
                    </Box>
                    {recentSearches.map((item) => (
                      <Box
                        key={item}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          cursor: "pointer",
                          fontSize: "1rem",
                          color: "#1565c0",
                          "&:hover": { background: "#e0eafc" },
                        }}
                        onMouseDown={() => {
                          setSearch(item);
                          setShowSuggestions(false);
                        }}
                      >
                        {item}
                      </Box>
                    ))}
                    <Divider sx={{ my: 1 }} />
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        px: 1,
                        fontWeight: 500,
                        color: "#2193b0",
                      }}
                    >
                      {["Cases", "Jobs", "Webinars"].map((item) => (
                        <Box
                          key={item}
                          sx={{
                            cursor: "pointer",
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            "&:hover": { background: "#e0eafc" },
                          }}
                          onMouseDown={() => {
                            setSearch(item);
                            setShowSuggestions(false);
                          }}
                        >
                          {item}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                )}
              </form>
            </Box>
            {/* Mobile search bar */}
            <Box
              sx={{
                position: "relative",
                display: { xs: "block", md: "none" },
              }}
            >
              <IconButton
                sx={{
                  background: "#e0eafc",
                  borderRadius: "50%",
                  boxShadow: "0 1px 4px #2193b022",
                  width: 36,
                  height: 36,
                  p: 0,
                  ml: 1,
                }}
                aria-label="Search"
                title="Search"
                onClick={() => searchInputRef.current?.focus()}
              >
                <span
                  className="material-icons"
                  style={{ fontSize: 22, color: "#2193b0" }}
                >
                  search
                </span>
              </IconButton>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(search.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Search medical cases, jobs, or webinars…"
                aria-label="Search medical content"
                style={{
                  position: "absolute",
                  left: 44,
                  top: 0,
                  width: showSuggestions || search.length > 0 ? 180 : 0,
                  opacity: showSuggestions || search.length > 0 ? 1 : 0,
                  borderRadius: 30,
                  border: "1px solid #b0c4de",
                  height: 40,
                  fontSize: "1rem",
                  background: "#fff",
                  boxShadow: "0 2px 12px rgba(33,147,176,0.12)",
                  paddingLeft: 20,
                  paddingRight: 48,
                  margin: 0,
                  color: "#222",
                  transition: "width 0.2s, opacity 0.2s",
                  fontWeight: 500,
                }}
              />
              <IconButton
                type="submit"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background:
                    "linear-gradient(90deg, #1de9b6 0%, #2193b0 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 2px 8px #2193b044",
                  width: 40,
                  height: 40,
                  p: 0,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.08)",
                    boxShadow: "0 4px 16px #2193b066",
                    background:
                      "linear-gradient(90deg, #2193b0 0%, #1de9b6 100%)",
                  },
                }}
                aria-label="Search medical content"
                title="Search"
              >
                <SearchIcon sx={{ color: "#fff", fontSize: 22 }} />
              </IconButton>
              {/* Suggestions dropdown for mobile */}
              {showSuggestions && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: 40,
                    left: 0,
                    width: 220,
                    zIndex: 10,
                    borderRadius: 3,
                    boxShadow: "0 4px 16px #2193b044",
                    mt: 1,
                    p: 1,
                  }}
                >
                  <Box sx={{ mb: 1, px: 1, fontWeight: 600, color: "#1565c0" }}>
                    Recent Searches
                  </Box>
                  {recentSearches.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        cursor: "pointer",
                        fontSize: "1rem",
                        color: "#1565c0",
                        "&:hover": { background: "#e0eafc" },
                      }}
                      onMouseDown={() => {
                        setSearch(item);
                        setShowSuggestions(false);
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      px: 1,
                      fontWeight: 500,
                      color: "#2193b0",
                    }}
                  >
                    {["Cases", "Jobs", "Webinars"].map((item) => (
                      <Box
                        key={item}
                        sx={{
                          cursor: "pointer",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          "&:hover": { background: "#e0eafc" },
                        }}
                        onMouseDown={() => {
                          setSearch(item);
                          setShowSuggestions(false);
                        }}
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              )}
            </Box>
          </Box>
          {/* Main Nav Buttons with active underline */}
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button
              color="inherit"
              component={Link}
              href="/cases"
              sx={navActive("/cases")}
            >
              Cases
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/jobs"
              sx={navActive("/jobs")}
            >
              Jobs
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/webinars"
              sx={navActive("/webinars")}
            >
              Webinars
            </Button>
            <Button
              color="inherit"
              onClick={handleMoreClick}
              sx={{ textTransform: "none" }}
            >
              More
            </Button>
            <Menu
              anchorEl={moreAnchorEl}
              open={moreOpen}
              onClose={handleMoreClose}
              PaperProps={{ sx: { minWidth: 160, borderRadius: 2 } }}
            >
              <MenuItem
                onClick={() => {
                  handleMoreClose();
                  router.push("/resources");
                }}
              >
                Resources
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMoreClose();
                  router.push("/leaderboard");
                }}
              >
                Leaderboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMoreClose();
                  router.push("/patients");
                }}
              >
                Patients
              </MenuItem>
            </Menu>
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={() => router.push("/notifications")}
              aria-label="Notifications"
            >
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              href="/about"
              sx={{ ml: 1 }}
            >
              <InfoIcon />
            </IconButton>
          </Box>
          {/* Profile Dropdown: always visible, right side */}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <ProfileDropdown onNavigate={router.push} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
