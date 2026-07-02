import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  Tab,
  Tabs,
} from "@mui/material";
import api from '../utils/api';
import WebinarJoin from "../components/WebinarJoin";
import { canUser } from "../utils/permissions";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/layout/EmptyState";
import { Plus, Video } from "lucide-react";

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
  <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, minHeight: "80vh" }}>
      <PageHeader
        title="Webinars"
        subtitle="Join upcoming webinars, live AMAs, and expert sessions to expand your medical expertise."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Webinars" }]}
        action={
          canManageWebinars ? (
            <Button
              onClick={() => router.push('/webinars/create')}
              variant="contained"
              startIcon={<Plus size={18} />}
            >
              Create Webinar
            </Button>
          ) : null
        }
      />
      <Card sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="Webinar status tabs"
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Active Webinars" value="active" />
          <Tab label="Completed Webinars" value="completed" />
        </Tabs>
        <List>
          {webinars.length === 0 ? (
            <EmptyState
              icon={Video}
              title={activeTab === 'active' ? 'No active webinars' : 'No completed webinars'}
              description={activeTab === 'active' ? 'Upcoming expert sessions will appear here once they are scheduled.' : 'Completed webinar recordings and history will appear here.'}
            />
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
                  pr: { xs: 2, sm: 18 },
                }}
                secondaryAction={
                  canJoin ? (
                    <Button
                      variant="contained"
                      sx={{
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                      }}
                      onClick={() => setSelectedWebinar(w)}
                    >
                      Join
                    </Button>
                  ) : canRegister ? (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        px: 3,
                        py: 1,
                        fontWeight: 700,
                      }}
                      onClick={() => handleRegister(w._id)}
                    >
                      Register
                    </Button>
                  ) : canUnregister ? (
                    <Button
                      variant="outlined"
                      color="warning"
                      sx={{
                        px: 3,
                        py: 1,
                        fontWeight: 700,
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
                        bgcolor: "action.disabledBackground",
                        color: "text.secondary",
                        opacity: 0.8,
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
    </Container>
  );
}
