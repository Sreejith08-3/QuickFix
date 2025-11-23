import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { mockForumPosts } from '@/lib/mockData';
import { ThumbsUp, MessageCircle, Search, Plus, CheckCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ForumComment, UserRole } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAuth } from '@/contexts/AuthContext';

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showCommentInput, setShowCommentInput] = useState<Record<string, boolean>>({});
  const [newPostData, setNewPostData] = useState({ title: '', content: '', category: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/forum');
      setPosts(data.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostData.title || !newPostData.content || !newPostData.category) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data } = await api.post('/forum', newPostData);
      setPosts([data.data, ...posts]);
      setIsDialogOpen(false);
      setNewPostData({ title: '', content: '', category: '' });
      toast({
        title: 'Post created!',
        description: 'Your question has been posted to the forum.',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to create post',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpvotePost = async (postId: string) => {
    try {
      const { data } = await api.put(`/forum/${postId}/upvote`);
      setPosts(posts.map(post =>
        post._id === postId ? data.data : post
      ));
      toast({
        description: "Post upvoted!",
      });
    } catch (error) {
      console.error('Failed to upvote:', error);
    }
  };

  const handleUpvoteComment = async (postId: string, commentId: string) => {
    try {
      const { data } = await api.put(`/forum/${postId}/comments/${commentId}/upvote`);
      setPosts(posts.map(post =>
        post._id === postId ? data.data : post
      ));
      toast({
        description: "Comment upvoted!",
      });
    } catch (error) {
      console.error('Failed to upvote comment:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    try {
      const { data } = await api.post(`/forum/${postId}/comments`, {
        content: commentText
      });

      setPosts(posts.map(post =>
        post._id === postId ? data.data : post
      ));

      setCommentInputs({ ...commentInputs, [postId]: '' });
      setShowCommentInput({ ...showCommentInput, [postId]: false });

      toast({
        description: "Comment added successfully!",
      });
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast({
        title: 'Failed to add comment',
        variant: 'destructive',
      });
    }
  };

  const toggleCommentInput = (postId: string) => {
    setShowCommentInput({
      ...showCommentInput,
      [postId]: !showCommentInput[postId]
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">
              Get advice, share experiences, and learn from experts
            </p>
          </div>
          {isAuthenticated ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Ask a question or share your experience
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="What's your question?"
                      value={newPostData.title}
                      onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newPostData.category}
                      onValueChange={(value) => setNewPostData({ ...newPostData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Describe your question in detail..."
                      rows={6}
                      value={newPostData.content}
                      onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleCreatePost}>Post Question</Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button variant="outline" onClick={() => window.location.href = '/auth'}>
              Login to Post
            </Button>
          )}
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search forum posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3 flex-1">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author?.name || 'User'}`} />
                      <AvatarFallback>{post.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{post.author?.name || 'Unknown User'}</span>
                        {post.author?.role === 'technician' && (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified Tech
                          </Badge>
                        )}
                        {post.author?.role === 'admin' && (
                          <Badge variant="destructive" className="text-xs">
                            Admin
                          </Badge>
                        )}
                        <Badge variant="outline" className="capitalize text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription>{post.content}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <button
                    onClick={() => isAuthenticated ? handleUpvotePost(post._id) : toast({ description: "Please login to upvote" })}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {post.upvotes} upvotes
                  </button>
                  <button
                    onClick={() => toggleCommentInput(post._id)}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {post.comments.length} comments
                  </button>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {showCommentInput[post._id] && (
                  <div className="mt-6 pt-6 border-t">
                    {isAuthenticated ? (
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Textarea
                            placeholder="Write your comment..."
                            value={commentInputs[post._id] || ''}
                            onChange={(e) => setCommentInputs({
                              ...commentInputs,
                              [post._id]: e.target.value
                            })}
                            rows={3}
                            className="resize-none"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleCommentInput(post._id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddComment(post._id)}
                              disabled={!commentInputs[post._id]?.trim()}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-2">Please login to join the discussion</p>
                        <Button variant="outline" onClick={() => window.location.href = '/auth'}>
                          Login
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {post.comments.length > 0 && (
                  <div className="mt-6 pt-6 border-t space-y-4">
                    {post.comments.map((comment: any) => (
                      <div key={comment._id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author?.name || 'User'}`} />
                          <AvatarFallback>{comment.author?.name?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">{comment.author?.name || 'Unknown User'}</span>
                            {comment.author?.role === 'technician' && (
                              <Badge variant="default" className="text-xs h-5">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {comment.author?.role === 'admin' && (
                              <Badge variant="destructive" className="text-xs h-5">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button
                              onClick={() => isAuthenticated ? handleUpvoteComment(post._id, comment._id) : toast({ description: "Please login to upvote" })}
                              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              {comment.upvotes}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No posts found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Forum;
