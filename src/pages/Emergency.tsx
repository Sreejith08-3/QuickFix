import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TechnicianCard } from '@/components/TechnicianCard';
import { mockTechnicians } from '@/lib/mockData';
import { AlertCircle, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
const Emergency = () => {
  const [step, setStep] = useState<'detecting' | 'matching' | 'found'>('detecting');
  const [progress, setProgress] = useState(0);
  const [nearestTechnician, setNearestTechnician] = useState(mockTechnicians[0]);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmergencyBooking = async () => {
    setIsBooking(true);
    try {
      await api.post('/bookings', {
        technicianId: nearestTechnician.id,
        serviceCategory: 'Emergency',
        description: 'Emergency Service Request',
        scheduledDate: new Date().toISOString(),
        location: 'Current Location', // In a real app, use actual coordinates
        estimatedCost: 500
      });

      toast({
        title: 'Emergency Booking Confirmed',
        description: 'Help is on the way!',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Booking failed:', error);
      toast({
        title: 'Booking Failed',
        description: 'Could not confirm booking. Please try calling.',
        variant: 'destructive',
      });
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    // Simulate location detection and matching
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (step === 'detecting') {
            setTimeout(() => setStep('matching'), 500);
          } else if (step === 'matching') {
            setTimeout(() => setStep('found'), 500);
          }
          return 0;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [step]);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 mb-4">
            <AlertCircle className="h-8 w-8 text-destructive animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Emergency QuickFix</h1>
          <p className="text-xl text-muted-foreground">
            We're finding the nearest available technician for you
          </p>
        </div>

        <div className="space-y-6">
          {/* Detection Step */}
          <Card className={step === 'detecting' ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className={`h-5 w-5 ${step === 'detecting' ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                  <CardTitle className="text-lg">Detecting Your Location</CardTitle>
                </div>
                {step !== 'detecting' && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
            </CardHeader>
            {step === 'detecting' && (
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Using GPS to find your exact location...
                </p>
              </CardContent>
            )}
          </Card>

          {/* Matching Step */}
          <Card className={step === 'matching' ? 'border-primary' : step === 'found' ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className={`h-5 w-5 ${step === 'matching' ? 'text-primary animate-pulse' : step === 'found' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <CardTitle className="text-lg">Finding Available Technician</CardTitle>
                </div>
                {step === 'found' && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
            </CardHeader>
            {step === 'matching' && (
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Scanning for emergency-ready technicians nearby...
                </p>
              </CardContent>
            )}
          </Card>

          {/* Found Step */}
          {step === 'found' && (
            <Card className="border-primary bg-accent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Technician Found!</CardTitle>
                    <CardDescription>
                      Estimated arrival: 15-20 minutes
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">Distance: 2.3 km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">Current location: Nearby, en route</span>
                  </div>
                </div>

                <TechnicianCard technician={nearestTechnician} />

                <div className="flex gap-4">
                  <Button className="flex-1" size="lg" onClick={handleEmergencyBooking} disabled={isBooking}>
                    {isBooking ? 'Confirming...' : 'Confirm Emergency Booking'}
                  </Button>
                  <Button variant="outline" size="lg">
                    Call Technician
                  </Button>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Emergency Service Details</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Priority service - technician will arrive ASAP</li>
                    <li>• Emergency surcharge: ₹500 (added to service cost)</li>
                    <li>• No cancellation fee if issue is resolved remotely</li>
                    <li>• Full diagnostic before any work begins</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {step !== 'found' && (
          <Card className="mt-6 bg-muted">
            <CardContent className="py-6">
              <p className="text-center text-muted-foreground">
                Please stay on this page while we find help for you. This usually takes 30-60 seconds.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Emergency;
