import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import api from '../utils/api';
import WebinarJoin from "../components/WebinarJoin";
import { canUser } from "../utils/permissions";
import { hasAuthToken, redirectToLogin } from "../utils/authRedirect";

const getWebinarEndTime = (webinar: any) => {
  const duration = Number(webinar.duration || 0);
  return new Date(new Date(webinar.scheduledAt).getTime() + duration * 60 * 1000);
};

const isWebinarExpired = (webinar: any) => {
  const now = new Date();

  if (webinar.status === "completed" || webinar.status === "cancelled") {
    return true;
  }

  if (webinar.status === "live") {
    return getWebinarEndTime(webinar) <= now;
  }

  return new Date(webinar.scheduledAt) <= now;
};


export default function WebinarsPage() {
  const router = useRouter();
  const [webinars, setWebinars] = useState<any[]>([]);
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null);
  const [canManageWebinars, setCanManageWebinars] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [registeredWebinars, setRegisteredWebinars] = useState<Set<string>>(new Set());
  const [currentUserId, setCurrentUserId] = useState<string>('');


    useEffect(() => {
      const endpoint = activeTab === 'active'
        ? '/webinars?upcoming=true'
        : '/webinars?limit=100&sortBy=scheduledAt&sortOrder=desc';

      api.get(endpoint)
        .then(res => {
          const fetchedWebinars = res.data.data.webinars || [];
          const visibleWebinars = activeTab === 'active'
            ? fetchedWebinars.filter((webinar: any) => !isWebinarExpired(webinar))
            : fetchedWebinars.filter((webinar: any) => isWebinarExpired(webinar));

          setWebinars(visibleWebinars);
        })
        .catch(() => setWebinars([]));
    }, [activeTab]);

    useEffect(() => {
      // Fetch user profile to check whether the current role can manage webinars.
      api.get('/auth/profile')
        .then(res => {
          const user = res.data?.data?.user;
          const userType = user?.userType;
          setCurrentUserId(user?._id || '');
          setCanManageWebinars(canUser(userType, 'webinar:manage'));
        })
        .catch(() => setCanManageWebinars(false));
    }, []);

    // Check which webinars the user is registered for
    useEffect(() => {
      if (!currentUserId) return;
      
      const registered = new Set<string>();
      webinars.forEach((w) => {
        const isRegistered = w.participants?.some(
          (p: any) => (p.user?._id === currentUserId || p.user === currentUserId)
        );
        if (isRegistered) {
          registered.add(w._id);
        }
      });
      setRegisteredWebinars(registered);
    }, [webinars, currentUserId]);

  if (selectedWebinar) {
    return <WebinarJoin meetingLink={selectedWebinar.meetingLink} onLeave={() => setSelectedWebinar(null)} />;
  }

  const handleRegister = async (webinarId: string) => {
    try {
      await api.post(`/webinars/${webinarId}/register`, {});
      // Update registered webinars set
      setRegisteredWebinars(prev => new Set([...prev, webinarId]));
      alert('Registered successfully for webinar!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to register for webinar';
      alert(message);
    }
  };

  const handleUnregister = async (webinarId: string) => {
    try {
      await api.delete(`/webinars/${webinarId}/register`);
      // Update registered webinars set
      setRegisteredWebinars(prev => {
        const updated = new Set(prev);
        updated.delete(webinarId);
        return updated;
      });
      alert('Unregistered successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to unregister';
      alert(message);
    }
  };


  return (
  <Box maxWidth={700} mx="auto" my={4} sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", mt: 10 }}>
      <Card sx={{ p: 4, borderRadius: 4, boxShadow: "0 2px 12px #2193b022", background: "linear-gradient(120deg, #f8f9fa 0%, #e0eafc 100%)", width: "100%" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" fontWeight={900} color="#1565c0" sx={{ letterSpacing: 1 }}>
            Webinars
          </Typography>
          {canManageWebinars && (
            <IconButton
              onClick={() => router.push('/webinars/create')}
              color="primary"
              sx={{ bgcolor: "#e3f2fd", borderRadius: 2 }}
              aria-label="Add Webinar"
            >
              <AddIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}
        </Box>
        <Typography variant="subtitle1" color="text.secondary" mb={3} sx={{ fontSize: "1.12rem", fontWeight: 500 }}>
          Join upcoming webinars and expand your medical expertise. Learn from top professionals and stay updated with the latest trends.
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Active Webinars" value="active" />
          <Tab label="Completed Webinars" value="completed" />
        </Tabs>
        <List>
          {webinars.length === 0 ? (
            <Typography color="text.secondary">
              {activeTab === 'active' ? 'No active webinars available.' : 'No completed webinars available.'}
            </Typography>
          ) : (
            webinars.map((w, i) => {
              const expired = isWebinarExpired(w);
              const isRegistered = registeredWebinars.has(w._id);
              const canJoin = activeTab === 'active' && !expired && (w.status === 'live');
              const canRegister = activeTab === 'active' && !expired && w.status === 'scheduled' && !isRegistered;
              const canUnregister = activeTab === 'active' && !expired && w.status === 'scheduled' && isRegistered;

              return (
              <ListItem
                key={w._id}
                sx={{ animation: `slideUp 0.6s ${i * 0.1}s both`, borderRadius: 3, mb: 2, boxShadow: "0 1px 4px #2193b022", background: "#fff" }}
                secondaryAction={
                  canJoin ? (
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                        fontSize: "1.02rem",
                        background: "#1976d2",
                        color: "#fff",
                        boxShadow: "0 2px 8px #2193b044",
                        transition: "all 0.2s",
                        "&:hover": {
                          background: "#1565c0",
                          boxShadow: "0 4px 16px #2193b066",
                        },
                      }}
                      onClick={() => setSelectedWebinar(w)}
                    >
                      Join
                    </Button>
                  ) : canRegister ? (
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                        fontSize: "1.02rem",
                        background: "#4caf50",
                        color: "#fff",
                        boxShadow: "0 2px 8px #4caf5044",
                        transition: "all 0.2s",
                        "&:hover": {
                          background: "#388e3c",
                          boxShadow: "0 4px 16px #4caf5066",
                        },
                      }}
                      onClick={() => handleRegister(w._id)}
                    >
                      Register
                    </Button>
                  ) : canUnregister ? (
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                        fontSize: "1.02rem",
                        borderColor: "#ff9800",
                        color: "#ff9800",
                        transition: "all 0.2s",
                        "&:hover": {
                          background: "rgba(255,152,0,0.08)",
                          borderColor: "#f57c00",
                          color: "#f57c00",
                        },
                      }}
                      onClick={() => handleUnregister(w._id)}
                    >
                      Unregister
                    </Button>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                        fontSize: "1.02rem",
                        background: "linear-gradient(90deg, #bdbdbd 60%, #e0eafc 100%)",
                        color: "#666",
                        boxShadow: "0 2px 8px #2193b022",
                        opacity: 0.8,
                        letterSpacing: 1,
                        border: "none",
                        cursor: "not-allowed",
                        userSelect: "none",
                      }}>
                        {expired ? (w.status === 'cancelled' ? 'Cancelled' : 'Completed') : w.status === 'scheduled' ? 'Scheduled' : 'Not Joinable'}
                      </Box>
                    </Box>
                  )
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography fontWeight={700} fontSize={18}>{w.title}</Typography>
                      <Chip
                        label={expired ? (w.status === 'cancelled' ? 'Cancelled' : 'Completed') : w.status}
                        color={expired ? 'default' : w.status === 'live' ? 'success' : 'primary'}
                        size="small"
                      />
                      {isRegistered && (
                        <Chip
                          label="Registered"
                          color="success"
                          variant="outlined"
                          size="small"
                        />
                      )}
                    </Box>
                  }
                  secondary={<Typography color="text.secondary">{new Date(w.scheduledAt).toLocaleString()}</Typography>}
                />
              </ListItem>
              );
            })
          )}
        </List>
        <style jsx global>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </Card>
    </Box>
  );
}
