import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function WebinarCard({ webinar }: { webinar: any }) {
  // Status pill styling
  const status = webinar.status || "Upcoming";
  const statusColor = status === "Upcoming" ? "#2193b0" : "#bdbdbd";
  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: "0 2px 12px #2193b022" }}>
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Left: Title and Date */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: "#1565c0", mb: 0.5, wordBreak: "break-word" }}
              component={Link}
              href={`/webinars/${webinar._id}`}
            >
              {webinar.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: 14, mb: 0.5 }}
            >
              {webinar.date ? webinar.date : "Date TBA"}
            </Typography>
          </Box>
          {/* Right: Status pill and View button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                background: statusColor,
                color: "#fff",
                minWidth: 90,
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              {status}
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 20,
                minWidth: 80,
                fontWeight: 600,
                ml: 1,
                px: 2.5,
                py: 0.5,
                textTransform: "none",
                borderColor: "#2193b0",
                color: "#2193b0",
                "&:hover": { borderColor: "#1565c0", color: "#1565c0" },
              }}
              component={Link}
              href={`/webinars/${webinar._id}`}
            >
              View
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
