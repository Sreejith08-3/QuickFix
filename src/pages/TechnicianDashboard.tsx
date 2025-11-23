import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, MessageSquare, CheckCircle } from 'lucide-react';
import { ChatWindow } from '@/components/ChatWindow';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const TechnicianDashboard = () => {
    const { user } = useAuth();
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
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings/technician');
                setBookings(data.data);
            } catch (error) {
                console.error('Failed to fetch technician bookings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleUpdateStatus = async (bookingId: string, status: string) => {
        try {
            await api.put(`/bookings/${bookingId}/status`, { status });
            setBookings(bookings.map(b =>
                b._id === bookingId ? { ...b, status } : b
            ));
            // If completed, move to completed tab (handled by filter)
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const statusColors: Record<string, string> = {
        pending: 'secondary',
        confirmed: 'default',
        in_progress: 'default',
        completed: 'success', // custom variant needed or just use default
        cancelled: 'destructive',
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-8 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-bold">Technician Dashboard</h1>
                        <Badge variant="secondary" className="text-lg">Verified Pro</Badge>
                    </div>
                    <p className="text-muted-foreground">Welcome back, {user?.name}. Here are your assigned jobs.</p>
                </div>

                <Tabs defaultValue="active" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="active">Active Jobs</TabsTrigger>
                        <TabsTrigger value="completed">Completed History</TabsTrigger>
                        <TabsTrigger value="profile">My Profile</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="space-y-6">
                        {isLoading ? (
                            <div className="text-center py-12">Loading jobs...</div>
                        ) : bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <p className="text-muted-foreground">No active jobs at the moment.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-6">
                                {bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').map((booking) => (
                                    <Card key={booking._id} className="border-l-4 border-l-primary">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="capitalize">{booking.serviceCategory} Service</CardTitle>
                                                    <CardDescription className="mt-1">Customer: {booking.user?.name}</CardDescription>
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
                                                    {new Date(booking.scheduledDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    {new Date(booking.scheduledDate).toLocaleTimeString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    {booking.location}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {booking.user?.phone || 'No phone provided'}
                                                </div>
                                            </div>

                                            <div className="bg-accent/30 p-3 rounded-md text-sm">
                                                <span className="font-semibold">Description: </span>
                                                {booking.description}
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4 border-t">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setActiveChat({
                                                        bookingId: booking._id,
                                                        recipientId: booking.user?._id,
                                                        recipientName: booking.user?.name,
                                                        recipientAvatar: booking.user?.avatar
                                                    })}
                                                >
                                                    <MessageSquare className="h-4 w-4 mr-1" />
                                                    Chat with Customer
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm">Update Status</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Update Job Status</DialogTitle>
                                                            <DialogDescription>
                                                                Change the status of this job.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <Button
                                                                    variant={booking.status === 'in_progress' ? 'default' : 'outline'}
                                                                    onClick={() => handleUpdateStatus(booking._id, 'in_progress')}
                                                                >
                                                                    In Progress
                                                                </Button>
                                                                <Button
                                                                    variant={booking.status === 'completed' ? 'default' : 'outline'}
                                                                    onClick={() => handleUpdateStatus(booking._id, 'completed')}
                                                                >
                                                                    Completed
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="completed">
                        <div className="grid gap-6">
                            {bookings.filter(b => b.status === 'completed').map((booking) => (
                                <Card key={booking._id} className="opacity-80">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="capitalize">{booking.serviceCategory} Service</CardTitle>
                                                <CardDescription>{new Date(booking.scheduledDate).toLocaleDateString()}</CardDescription>
                                            </div>
                                            <Badge variant="outline">COMPLETED</Badge>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                            {bookings.filter(b => b.status === 'completed').length === 0 && (
                                <p className="text-muted-foreground text-center py-8">No completed jobs yet.</p>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Technician Profile</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Profile settings coming soon...</p>
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

export default TechnicianDashboard;
