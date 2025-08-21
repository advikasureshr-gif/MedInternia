import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import api from "../../utils/api";
import { useRouter } from "next/router";

export default function CreateCase() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "beginner",
    specialization: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convert images to Base64 and store in array
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const promises = files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );
      Promise.all(promises).then((base64Files) => {
        setImages(base64Files);
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        images, // array of base64 images
      };

      await api.post("/cases", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("Case created successfully!");
      setForm({ title: "", description: "", difficulty: "beginner", specialization: "" });
      setImages([]);

      setTimeout(() => router.push("/cases"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create case");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Card sx={{ boxShadow: 4, borderRadius: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
              🩺 Create Medical Case
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Specialization"
                  name="specialization"
                  fullWidth
                  value={form.specialization}
                  onChange={handleChange}
                  required
                />
                <TextField
                  select
                  label="Difficulty"
                  name="difficulty"
                  fullWidth
                  value={form.difficulty}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </TextField>

                {/* Image Upload */}
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    {images.length > 0 ? "Change Images" : "Upload Case Image(s)"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      onChange={handleImageChange}
                    />
                  </Button>

                  {/* Preview Uploaded Images */}
                  {images.length > 0 && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                      {images.map((img, idx) => (
                        <CardMedia
                          key={idx}
                          component="img"
                          image={img}
                          alt={`Preview ${idx}`}
                          sx={{
                            width: 150,
                            height: 150,
                            objectFit: "cover",
                            borderRadius: 2,
                            boxShadow: 2,
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
                >
                  🚀 Create Case
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
