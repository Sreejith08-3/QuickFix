import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle2,
  Upload,
  Wrench,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Star
} from 'lucide-react';

const BecomeTechnician = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: [] as string[],
    bio: '',
    hourlyRate: '',
  });

  const skills = [
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Painting',
    'HVAC',
    'Appliance Repair',
    'Locksmith',
    'Cleaning',
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: 'Earn More',
      description: 'Set your own rates and earn up to 40% more than traditional employment',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Flexible Schedule',
      description: 'Work when you want. Choose your own hours and availability',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Grow Your Business',
      description: 'Build your reputation with ratings, reviews, and badges',
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Secure Payments',
      description: 'Get paid directly and securely after each job completion',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/technicians/register', {
        ...formData,
        hourlyRate: Number(formData.hourlyRate),
        experience: Number(formData.experience),
      });

      toast({
        title: 'Application Submitted!',
        description: 'You have successfully registered as a technician.',
      });
      // Redirect to dashboard or technician profile
      // navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Application Failed',
        description: error.response?.data?.message || 'Could not submit application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Wrench className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Become a QuickFix Technician</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our network of verified professionals and grow your business with the power of AI-driven matching
            </p>
            <div className="flex gap-4 justify-center">
              <div className="bg-background/80 backdrop-blur rounded-lg p-4 hover-scale">
                <Star className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
              <div className="bg-background/80 backdrop-blur rounded-lg p-4 hover-scale">
                <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Technicians</div>
              </div>
              <div className="bg-background/80 backdrop-blur rounded-lg p-4 hover-scale">
                <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Jobs Done</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join QuickFix?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow animate-fade-in hover-scale" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mb-2">{benefit.icon}</div>
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>
                Fill out the form below to join our network of professional technicians
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      required
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    required
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Skills & Services * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                        />
                        <label
                          htmlFor={skill}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    required
                    min="0"
                    placeholder="500"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    required
                    placeholder="Tell us about your experience, certifications, and what makes you a great technician..."
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload ID proof, certifications, and work samples
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BecomeTechnician;
