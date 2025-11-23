import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Target, Eye, Heart, Users, Shield, Zap, Award, Globe } from 'lucide-react';
const AboutUs = () => {
  const navigate = useNavigate();
  const values = [{
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Trust & Safety',
    description: 'Every technician is verified, background-checked, and certified'
  }, {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Speed & Efficiency',
    description: 'Quick response times with AI-powered instant matching'
  }, {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Customer First',
    description: 'Your satisfaction is our top priority, always'
  }, {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Quality Excellence',
    description: 'Only the best technicians with proven track records'
  }];
  const team = [{
    name: 'Vijay Chandran',
    role: 'Founder & CEO',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vijay'
  }, {
    name: 'Priya Menon',
    role: 'Head of Technology',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
  }, {
    name: 'Rahul Pillai',
    role: 'Head of Operations',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  }, {
    name: 'Deepa Nair',
    role: 'Head of Customer Success',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepa'
  }];
  const milestones = [{
    year: '2020',
    title: 'Company Founded',
    description: 'QuickFix was born from a simple idea'
  }, {
    year: '2021',
    title: '100+ Technicians',
    description: 'Reached our first major milestone'
  }, {
    year: '2022',
    title: 'AI Integration',
    description: 'Launched AI-powered matching system'
  }, {
    year: '2023',
    title: '10K+ Customers',
    description: 'Serving thousands of happy customers'
  }, {
    year: '2024',
    title: 'Pan-India Expansion',
    description: 'Operating in 50+ cities across India'
  }];
  return <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">About QuickFix</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Revolutionizing home repairs with AI technology and skilled professionals
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow animate-fade-in hover-scale">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make home repairs simple, reliable, and accessible for everyone. We connect skilled technicians with customers who need them, using cutting-edge AI technology to ensure the perfect match every time.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow animate-fade-in hover-scale" style={{
            animationDelay: '0.1s'
          }}>
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To become India's most trusted home services platform, where quality meets convenience. We envision a world where every home repair need is just a tap away, backed by verified professionals and AI-powered efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => <Card key={index} className="hover:shadow-xl transition-shadow animate-fade-in hover-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Timeline */}
      

      {/* Team Section */}
      

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 animate-fade-in" />
          <h2 className="text-4xl font-bold mb-4 animate-fade-in">Join Our Journey</h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in">
            Be part of India's fastest-growing home services platform
          </p>
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button size="lg" variant="secondary" onClick={() => navigate('/auth?mode=signup')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/become-technician')} className="border-primary-foreground text-fuchsia-400 bg-slate-50">
              Become a Technician
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default AboutUs;