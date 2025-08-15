import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from "../../utils/api";
import Link from "next/link";
import CaseCard from "../../components/CaseCard";

export default function Cases() {
  const [cases, setCases] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/cases", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCases(res.data.data.cases || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch cases");
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} color="#1565c0" gutterBottom>
          Medical Cases
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={2}>
          Explore, review, and contribute to real-world medical cases.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2, borderRadius: 2, fontWeight: 600 }}
          component={Link}
          href="/cases/create"
        >
          Create New Case
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {cases.length === 0 ? (
          <Typography>No cases found.</Typography>
        ) : (
          cases.map((c) => <CaseCard key={c._id} caseData={c} />)
        )}
      </Box>
    </Container>
  );
}
