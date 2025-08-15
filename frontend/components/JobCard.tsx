import { Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
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
        <Typography
          variant="h6"
          fontWeight={700}
          color="#1565c0"
          gutterBottom
          component={Link}
          href={`/jobs/${job._id}`}
          sx={{
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {job.description}
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            background: "linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)",
            color: "#fff",
            boxShadow: "0 1px 4px #2193b022",
            mt: 1,
            "&:hover": {
              background: "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)",
              color: "#fff",
              boxShadow: "0 2px 8px #2193b044",
            },
          }}
          component={Link}
          href={`/jobs/${job._id}`}
        >
          Apply
        </Button>
      </CardContent>
    </Card>
  );
}
