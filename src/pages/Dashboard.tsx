import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockBookings } from '@/lib/mockData';
import { Calendar, Clock, MapPin, User, MessageSquare } from 'lucide-react';

import { ChatWindow } from '@/components/ChatWindow';

import TechnicianDashboard from './TechnicianDashboard';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChat, setActiveChat] = useState<{
    bookingId: string;
    recipientId: string;
    recipientName: string;
    recipientAvatar?: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // If technician, don't fetch user bookings here (TechnicianDashboard handles it)
    if (user?.role === 'technician') {
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/user');
        setBookings(data.data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, navigate, user]);

  if (!user) return null;

  if (user.role === 'technician') {
    navigate('/technician-dashboard');
    return null;
  }

  if (user.role === 'admin') {
    navigate('/admin/dashboard');
    return null;
  }

  const statusColors: Record<string, string> = {
    pending: 'secondary',
    confirmed: 'default',
    in_progress: 'default',
    completed: 'default',
    cancelled: 'destructive',
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-accent/20 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Manage your bookings and account</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Bookings</h2>
              <Button onClick={() => navigate('/services')}>
                Book New Service
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">Loading bookings...</div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="capitalize">{booking.serviceCategory} Service</CardTitle>
                          <CardDescription className="mt-1">{booking.description}</CardDescription>
                        </div>
                        <Badge variant={statusColors[booking.status] as any}>
                          {booking.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(booking.scheduledDate).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {new Date(booking.scheduledDate).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {booking.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Technician: {booking.technician?.name || 'Pending Assignment'}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <span className="text-sm text-muted-foreground">Estimated Cost:</span>
                          <span className="font-semibold text-primary ml-2">₹{booking.estimatedCost}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveChat({
                              bookingId: booking._id,
                              recipientId: booking.technician?._id || 'admin', // Fallback to admin if no technician
                              recipientName: booking.technician?.name || 'Support',
                              recipientAvatar: booking.technician?.avatar
                            })}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {mockBookings.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any bookings yet</p>
                  <Button onClick={() => navigate('/services')}>
                    Book Your First Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-lg">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <p className="text-lg">
                      {typeof user.location === 'string'
                        ? user.location
                        : (user.location as any)?.address || 'Not specified'}
                    </p>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your recent notifications and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No new notifications</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {activeChat && (
        <ChatWindow
          bookingId={activeChat.bookingId}
          recipientId={activeChat.recipientId}
          recipientName={activeChat.recipientName}
          recipientAvatar={activeChat.recipientAvatar}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
