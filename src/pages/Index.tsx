import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ServiceCard';
import { TechnicianCard } from '@/components/TechnicianCard';
import { mockServices, mockTechnicians } from '@/lib/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-banner.jpg';
import patternBg from '@/assets/pattern-bg.jpg';
import { Zap, Users, Shield, Clock, Star, TrendingUp, Sparkles, MessageSquare, Camera, CheckCircle } from 'lucide-react';
import { Service } from '@/types';
const Index = () => {
  const navigate = useNavigate();
  const {
    language
  } = useLanguage();
  const {
    t
  } = useTranslation(language);
  const handleBookService = (service: Service) => {
    navigate(`/booking?service=${service.category}`);
  };
  const features = [{
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Matching',
    description: 'Get connected with the perfect technician based on skills, location, and availability'
  }, {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: 'AI Diagnostics',
    description: 'Upload photos to get instant diagnosis and cost estimates powered by AI'
  }, {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Verified Technicians',
    description: 'All technicians are background-checked and certified professionals'
  }, {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Real-Time Updates',
    description: 'Track your booking status and chat with technicians in real-time'
  }, {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: 'Badge System',
    description: 'Technicians earn badges for excellence, fast response, and expertise'
  }, {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: 'Community Forum',
    description: 'Get advice, share experiences, and learn from other users and experts'
  }];
  const stats = [{
    value: '10,000+',
    label: 'Happy Customers'
  }, {
    value: '500+',
    label: 'Verified Technicians'
  }, {
    value: '50,000+',
    label: 'Jobs Completed'
  }, {
    value: '4.8/5',
    label: 'Average Rating'
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center bg-cover bg-center overflow-hidden" style={{
      backgroundImage: `linear-gradient(135deg, rgba(139, 50, 168, 0.85), rgba(74, 29, 150, 0.85)), url(${heroImage})`
    }}>
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" style={{
        animationDuration: '4s'
      }}></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Badge */}
            
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Verified Technicians</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Best Price Guarantee</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" variant="secondary" className="text-lg h-16 px-10 hover-scale shadow-2xl font-semibold" onClick={() => navigate('/services')}>
                {t('hero.cta.primary')}
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-16 px-10 hover-scale shadow-2xl bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-primary font-semibold" onClick={() => navigate('/emergency')}>
                <Sparkles className="mr-2 h-5 w-5" />
                {t('hero.cta.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-background to-accent/50 animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url(${patternBg})`,
        backgroundSize: 'cover'
      }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center hover-scale animate-fade-in bg-card/40 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-border/50 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:via-transparent before:to-accent/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative z-10">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <span className="text-primary font-semibold">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional services for all your home repair needs across Kerala
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.map((service, index) => <div key={service.id} className="animate-fade-in hover-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <ServiceCard service={service} onBook={handleBookService} />
              </div>)}
          </div>
        </div>
      </section>

      {/* Top Technicians Section */}
      <section className="py-24 bg-gradient-to-br from-accent/50 via-background to-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-primary font-semibold">Top Rated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Top Technicians</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Verified professionals with excellent ratings and expertise from across Kerala
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTechnicians.map((technician, index) => <div key={technician.id} className="animate-fade-in hover-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <TechnicianCard technician={technician} />
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Section - Moved Below */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Why Choose QuickFix?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge AI technology with skilled technicians to provide the best home repair experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <div key={index} className="relative overflow-hidden p-6 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50 hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 animate-fade-in group before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:via-accent/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative z-10">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Become a Technician CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden border-y border-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),transparent_60%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30 shadow-lg">
                <Users className="h-5 w-5 text-white" />
                <span className="text-white font-bold tracking-wide">Join Our Network</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Become a Technician
              </h2>
              <p className="text-xl text-white/95 leading-relaxed font-medium">
                Join Kerala's fastest-growing network of skilled technicians. Get access to more clients, flexible scheduling, and competitive pay. Build your reputation with our badge system and grow your business.
              </p>
              <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-lg">Verified badge and profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-lg">Access to thousands of customers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-lg">Flexible working hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-lg">Competitive earnings</span>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="text-lg h-16 px-12 hover-scale shadow-2xl font-bold" onClick={() => navigate('/become-technician')}>
                Apply Now
                <TrendingUp className="ml-2 h-6 w-6" />
              </Button>
            </div>
            <div className="hidden lg:block animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="glassmorphism-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Active Technicians</div>
                  </div>
                  <div className="glassmorphism-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-primary mb-2">₹45k</div>
                    <div className="text-sm text-muted-foreground">Avg. Monthly Earnings</div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="glassmorphism-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="glassmorphism-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.05),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-slate-50"></div>
        <div className="container mx-auto px-4 text-center animate-fade-in relative z-10">
          <div className="max-w-3xl mx-auto backdrop-blur-sm rounded-3xl p-12 border border-white/10 shadow-2xl bg-violet-950">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl mb-10 text-white leading-relaxed font-medium drop-shadow-lg">
              Join thousands of satisfied customers who trust QuickFix for their home repairs across Kerala
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg h-16 px-10 hover-scale shadow-2xl font-bold" onClick={() => navigate('/auth?mode=signup')}>
                Create Free Account
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-16 px-10 hover-scale shadow-2xl bg-white/15 backdrop-blur-md border-white/40 text-white hover:bg-white hover:text-primary font-bold" onClick={() => navigate('/services')}>
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>;
};
export default Index;