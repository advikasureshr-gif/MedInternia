import { Card, CardContent, Typography, Button, Box, Avatar, Stack } from "@mui/material";
import Link from "next/link";

export default function CaseCard({ caseData, onOpenDiscussion, onReadMore, isExpanded }: { caseData: any, onOpenDiscussion?: (caseId: string) => void, onReadMore?: () => void, isExpanded?: boolean }) {
  // Status accent color and icon
  const statusMap = {
    Open: { color: "#1976d2", icon: "🔵" },
    Closed: { color: "#bdbdbd", icon: "🔒" },
    Pending: { color: "#64b5f6", icon: "⏳" },
  };

  const status: keyof typeof statusMap =
    (caseData?.status as keyof typeof statusMap) || "Open";
  const accent = statusMap[status] || statusMap["Open"];

  // Helper: get owner name and avatar
  const owner = caseData?.owner || caseData?.createdBy || {};
  const ownerName = owner.firstName || owner.name || "Unknown";
  const ownerAvatar = owner.avatarUrl || undefined;
  // Helper: get images (array of URLs)
  const images = Array.isArray(caseData?.images) ? caseData.images : [];
  // Helper: truncated description
  const desc = caseData?.description || "No description.";
  const shortDesc = desc.length > 180 ? desc.slice(0, 180) + "..." : desc;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        animation: "fadeInCard 0.7s",
        p: 2,
        borderRadius: 4,
        boxShadow: '0 2px 12px #2193b022',
        background: '#fff',
      }}
    >
      {/* Owner header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5, pb: 1, borderBottom: '1px solid #e3eafc' }}>
        <Avatar src={ownerAvatar} sx={{ width: 44, height: 44, bgcolor: '#2193b0', fontWeight: 700, fontSize: 22 }}>
          {ownerName[0]?.toUpperCase() || 'U'}
        </Avatar>
        <Box>
          <Typography fontWeight={700} fontSize={17} color="#1976d2">{ownerName}</Typography>
          <Typography fontSize={13} color="#888">Case Owner</Typography>
        </Box>
      </Stack>

      {/* Title and status */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
        <Typography fontSize={28} sx={{ color: accent.color }}>
          {accent.icon}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={800}
          color="#1565c0"
          sx={{ flex: 1, letterSpacing: 0.5 }}
        >
          {caseData?.title || "Untitled Case"}
        </Typography>
        <Box
          sx={{
            px: 2,
            py: 0.7,
            borderRadius: 2,
            background: accent.color,
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 1px 4px #2193b022",
            letterSpacing: 1,
          }}
        >
          {status}
        </Box>
      </Box>

      {/* Description preview */}
      <Typography color="#444" fontSize={16} sx={{ mb: images.length ? 1 : 2, mt: 0.5, fontWeight: 400 }}>
        {shortDesc}
      </Typography>

      {/* Images preview */}
      {images.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {images.slice(0, 3).map((img: string, idx: number) => (
            <Box key={idx} sx={{ width: 70, height: 70, borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 6px #2193b022', border: '1px solid #e3eafc', bgcolor: '#f8fafd' }}>
              <img src={img} alt={`case-img-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
      )}

      {/* View Details Button */}

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.1,
            fontWeight: 700,
            fontSize: "1.05rem",
            background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
            color: "#fff",
            boxShadow: "0 2px 8px #2193b044",
            letterSpacing: 1,
            transition: "all 0.2s",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0 0%, #2193b0 100%)",
              color: "#fff",
              boxShadow: "0 4px 16px #2193b066",
              filter: "brightness(1.08)",
              transform: "scale(1.03)",
            },
          }}
          onClick={onReadMore}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.1,
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#1976d2",
            borderColor: "#1976d2",
            letterSpacing: 1,
            boxShadow: "0 2px 8px #2193b022",
            transition: "all 0.2s",
            ml: 1,
            "&:hover": {
              background: "#e3f2fd",
              borderColor: "#1565c0",
              color: "#1565c0",
            },
          }}
          onClick={() => onOpenDiscussion && onOpenDiscussion(caseData._id)}
        >
          Discussions
        </Button>
      </Box>

      <style jsx global>{`
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Card>
  );
}
