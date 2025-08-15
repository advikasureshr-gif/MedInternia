import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function CaseCard({ caseData }: { caseData: any }) {
  // Status accent color and icon
  const statusMap = {
    Open: { color: "#43a047", icon: "🟢" },
    Closed: { color: "#bdbdbd", icon: "🔒" },
    Pending: { color: "#ffb300", icon: "⏳" },
  };
  const status: keyof typeof statusMap =
    (caseData?.status as keyof typeof statusMap) || "Open";
  const accent = statusMap[status] || statusMap["Open"];

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        background: "linear-gradient(120deg, #f8f9fa 0%, #e0eafc 100%)",
        boxShadow: "0 2px 12px #2193b022",
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: "0 6px 24px #2193b044",
          transform: "scale(1.02)",
        },
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography fontSize={24} sx={{ color: accent.color }}>
            {accent.icon}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={700}
            color="#1565c0"
            sx={{ flex: 1 }}
          >
            {caseData?.title || "Untitled Case"}
          </Typography>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              background: accent.color,
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {status}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {caseData?.description || "No description provided."}
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            background: accent.color,
            color: "#fff",
            boxShadow: "0 1px 4px #2193b022",
            mt: 1,
            "&:hover": {
              background: "#1565c0",
              color: "#fff",
              boxShadow: "0 2px 8px #2193b044",
            },
          }}
          component={Link}
          href={caseData?._id ? `/cases/${caseData._id}` : "#"}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
