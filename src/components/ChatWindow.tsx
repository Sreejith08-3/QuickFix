import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, MessageSquare } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import io from 'socket.io-client';

interface Message {
    _id: string;
    sender: {
        _id: string;
        name: string;
        avatar?: string;
    };
    message: string;
    createdAt: string;
}

interface ChatWindowProps {
    bookingId: string;
    recipientId: string;
    recipientName: string;
    recipientAvatar?: string;
    onClose: () => void;
}

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || (import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/');

export const ChatWindow = ({ bookingId, recipientId, recipientName, recipientAvatar, onClose }: ChatWindowProps) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<any>(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(SOCKET_URL);

        // Join booking room
        socketRef.current.emit('join_booking', bookingId);

        // Listen for incoming messages
        socketRef.current.on('receive_message', (message: Message) => {
            setMessages((prev) => [...prev, message]);
            scrollToBottom();
        });

        // Fetch initial messages
        fetchMessages();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [bookingId]);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get(`/chat/${bookingId}`);
            setMessages(data.data);
            scrollToBottom();
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            // Send message via API (which will emit socket event)
            await api.post('/chat', {
                bookingId,
                recipientId,
                message: newMessage,
            });

            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] flex flex-col shadow-2xl z-50 animate-in slide-in-from-bottom-10">
            <CardHeader className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border-2 border-white/20">
                        <AvatarImage src={recipientAvatar} />
                        <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-base">{recipientName}</CardTitle>
                        <p className="text-xs opacity-80 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-primary-foreground/20">
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full text-muted-foreground text-sm">
                            Loading messages...
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm gap-2 opacity-70">
                            <MessageSquare className="h-8 w-8" />
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg) => {
                                const isMe = msg.sender._id === user?.id;
                                return (
                                    <div
                                        key={msg._id}
                                        className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {!isMe && (
                                            <Avatar className="h-6 w-6 mt-1">
                                                <AvatarImage src={msg.sender.avatar} />
                                                <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isMe
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-muted text-foreground rounded-bl-none'
                                                }`}
                                        >
                                            <p>{msg.message}</p>
                                            <p className={`text-[10px] mt-1 ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={scrollRef} />
                        </div>
                    )}
                </ScrollArea>

                <div className="p-3 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};
