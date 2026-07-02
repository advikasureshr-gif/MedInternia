import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import api from "../utils/api";
import { hasAuthToken, redirectToLogin } from "../utils/authRedirect";
import { getCurrentUserRole } from "../utils/permissions";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/layout/EmptyState";
import { Briefcase } from "lucide-react";

export default function Jobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    if (!hasAuthToken()) {
      redirectToLogin(router, "/jobs");
      return;
    }

    setAuthChecked(true);
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    const storedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
    const currentUserType = storedUser?.userType || getCurrentUserRole() || "";
    setUserType(String(currentUserType).toLowerCase());

    api
      .get("/jobs")
      .then((res) => {
        setJobs(res.data.data.jobs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch jobs");
        setLoading(false);
      });
  }, [authChecked]);

  const isPatient = userType === "patient";

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress aria-label="Loading job opportunities" />
      </Box>
    );
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, minHeight: "80vh" }}>
      <PageHeader
        title="Job Opportunities"
        subtitle="Discover internships, residencies, and medical jobs tailored for doctors and interns."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Jobs" }]}
      />
      {isPatient ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          Job opportunities are currently available for doctors and interns.
        </Alert>
      ) : null}
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
        {isPatient ? (
          <Typography textAlign="center" color="text.secondary">
            Patients do not see job opportunities on this platform.
          </Typography>
        ) : jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No jobs found"
            description="Open internships, residencies, and medical roles will appear here once they are posted."
          />
        ) : (
          <List>
            {jobs.map((j, i) => (
              <ListItem
                key={j._id}
                sx={{
                  animation: `slideUp 0.6s ${i * 0.1}s both`,
                  borderRadius: 2,
                  mb: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  background: "background.paper",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    boxShadow: (theme) => theme.custom.cardShadowHover,
                    transform: "translateY(-2px)",
                  },
                }}
                secondaryAction={
                  j.status === "Open" ? (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                      }}
                    >
                      Apply
                    </Button>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                        bgcolor: "action.disabledBackground",
                        color: "text.secondary",
                        border: "none",
                        cursor: "not-allowed",
                        userSelect: "none",
                        }}
                      >
                        Closed
                      </Box>
                    </Box>
                  )
                }
              >
                <ListItemText
                  primary={
                    <Typography fontWeight={700} fontSize={18}>
                      {j.title}
                    </Typography>
                  }
                  secondary={
                    <Typography color="text.secondary">{j.location}</Typography>
                  }
                />
                <Chip
                  label={j.status}
                  color={j.status === "Open" ? "success" : "default"}
                  sx={{ ml: 2, fontWeight: 700 }}
                />
              </ListItem>
            ))}
          </List>
        )}

        <style jsx global>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </Card>
    </Container>
  );
}
