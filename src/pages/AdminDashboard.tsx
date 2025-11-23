import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Wrench,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
  MessageSquare,
  Shield,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user?.role !== 'admin') {
      // navigate('/auth'); // Or show access denied
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const [stats, setStats] = useState<any>(null);
  const [pendingTechnicians, setPendingTechnicians] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [forumPosts, setForumPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await api.get('/admin/dashboard');
      setStats(data.data.stats);
      setPendingTechnicians(data.data.pendingTechnicians);
      setRecentBookings(data.data.recentBookings);

      // Fetch forum posts
      const forumRes = await api.get('/forum');
      setForumPosts(forumRes.data.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/forum/${id}`);
      setForumPosts(forumPosts.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleApproveTechnician = async (id: string) => {
    try {
      await api.put(`/admin/technicians/${id}/approve`);
      setPendingTechnicians(pendingTechnicians.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to approve technician:', error);
    }
  };

  const handleRejectTechnician = async (id: string) => {
    try {
      await api.delete(`/admin/technicians/${id}`);
      setPendingTechnicians(pendingTechnicians.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to reject technician:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      change: '+12.5%',
      icon: <Users className="h-5 w-5" />,
      trend: 'up',
    },
    {
      title: 'Active Technicians',
      value: stats?.totalTechnicians || 0,
      change: '+8.2%',
      icon: <Wrench className="h-5 w-5" />,
      trend: 'up',
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      change: '+15.3%',
      icon: <Calendar className="h-5 w-5" />,
      trend: 'up',
    },
    {
      title: 'Revenue (₹)',
      value: `₹${stats?.totalRevenue || 0}`,
      change: '+20.1%',
      icon: <DollarSign className="h-5 w-5" />,
      trend: 'up',
    },
  ];



  if (!user || user.role !== 'admin') {
    return <div className="pt-20 text-center">Access Denied. Admin only.</div>;
  }

  return (
    <div className="min-h-screen pt-16 bg-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage QuickFix platform operations</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {stat.icon}
                  </div>
                  <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="technicians" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="technicians">
              <Shield className="h-4 w-4 mr-2" />
              Technician Approvals
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Calendar className="h-4 w-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="forum">
              <MessageSquare className="h-4 w-4 mr-2" />
              Forum Reports
            </TabsTrigger>
          </TabsList>

          {/* Technician Approvals */}
          <TabsContent value="technicians">
            <Card>
              <CardHeader>
                <CardTitle>Pending Technician Applications</CardTitle>
                <CardDescription>
                  Review and approve new technician registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTechnicians.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No pending applications</p>
                  ) : (
                    pendingTechnicians.map((tech) => (
                      <div
                        key={tech._id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div>
                          <h4 className="font-semibold">{tech.user?.name || 'Unknown'}</h4>
                          <p className="text-sm text-muted-foreground">Skills: {tech.skills.join(', ')}</p>
                          <p className="text-sm text-muted-foreground">Location: {tech.user?.location || 'N/A'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" onClick={() => handleApproveTechnician(tech._id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectTechnician(tech._id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Monitor and manage platform bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h4 className="font-semibold">{booking.user?.name || 'Guest'}</h4>
                        <p className="text-sm text-muted-foreground">
                          Technician: {booking.technician?.name || 'Unassigned'}
                        </p>
                        <p className="text-sm text-muted-foreground">Service: {booking.serviceCategory}</p>
                      </div>
                      <Badge
                        variant={
                          booking.status === 'completed'
                            ? 'default'
                            : booking.status === 'in_progress'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forum Management */}
          <TabsContent value="forum">
            <Card>
              <CardHeader>
                <CardTitle>Forum Management</CardTitle>
                <CardDescription>Monitor and moderate community discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forumPosts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No forum posts found</p>
                  ) : (
                    forumPosts.map((post) => (
                      <div
                        key={post._id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div>
                          <h4 className="font-semibold">{post.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Author: {post.author?.name || 'Unknown'} | Category: {post.category}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {post.content}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => window.open('/forum', '_blank')}>
                            View
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post._id)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
