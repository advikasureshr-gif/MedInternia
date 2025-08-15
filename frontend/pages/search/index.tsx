import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Mock search results
    setResults(
      e.target.value
        ? ["Result 1", "Result 2", "Result 3"].filter((item) =>
            item.toLowerCase().includes(e.target.value.toLowerCase())
          )
        : []
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Search..."
          variant="outlined"
          value={query}
          onChange={handleSearch}
        />
      </Paper>

      {/* Search Results */}
      {results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{item}</Typography>
                <Typography variant="body2">
                  This is a preview of the search result content.
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" color="text.secondary">
          No results found.
        </Typography>
      )}
    </Container>
  );
}
