import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TechnicianCard } from '@/components/TechnicianCard';
import { mockTechnicians, mockServices } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, FileText, CreditCard, CheckCircle } from 'lucide-react';
import { Technician } from '@/types';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const serviceCategory = searchParams.get('service') || 'electrical';

  const [step, setStep] = useState<'details' | 'technician' | 'confirm'>('details');
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [bookingData, setBookingData] = useState({
    description: '',
    location: '',
    date: '',
    time: '',
  });

  const service = mockServices.find((s) => s.category === serviceCategory);
  const availableTechnicians = mockTechnicians.filter((t) =>
    t.skills.includes(serviceCategory as any)
  );

  const handleNext = () => {
    if (step === 'details') {
      if (!bookingData.description || !bookingData.location || !bookingData.date || !bookingData.time) {
        toast({
          title: 'Missing information',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }
      setStep('technician');
    } else if (step === 'technician') {
      if (!selectedTechnician) {
        toast({
          title: 'No technician selected',
          description: 'Please select a technician to continue',
          variant: 'destructive',
        });
        return;
      }
      setStep('confirm');
    }
  };

  const handleBack = () => {
    if (step === 'technician') setStep('details');
    else if (step === 'confirm') setStep('technician');
  };

  const handleConfirm = async () => {
    try {
      await api.post('/bookings', {
        serviceCategory: service?.category,
        description: bookingData.description,
        scheduledDate: `${bookingData.date}T${bookingData.time}`,
        location: bookingData.location,
        technicianId: selectedTechnician?.id,
        estimatedCost: (service?.averagePrice || 0) + (selectedTechnician?.hourlyRate || 0),
      });

      toast({
        title: 'Booking confirmed!',
        description: 'Your booking has been successfully created.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Booking failed',
        description: error.response?.data?.message || 'Could not create booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book a Service</h1>
          <p className="text-muted-foreground capitalize">
            {service?.name || 'Select your service'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Details', 'Technician', 'Confirm'].map((label, index) => {
              const currentStep = step === 'details' ? 0 : step === 'technician' ? 1 : 2;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-full border-2 ${isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : isCompleted
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background'
                        }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-0.5 flex-1 mx-4 ${isCompleted ? 'bg-primary' : 'bg-border'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Details */}
        {step === 'details' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Booking Details
              </CardTitle>
              <CardDescription>Provide information about your service request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue or service you need..."
                  rows={4}
                  value={bookingData.description}
                  onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location">Service Location *</Label>
                <Input
                  id="location"
                  placeholder="Enter your full address"
                  value={bookingData.location}
                  onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => navigate('/services')}>
                  Cancel
                </Button>
                <Button onClick={handleNext}>Next: Select Technician</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Technician */}
        {step === 'technician' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommended Technicians</CardTitle>
                <CardDescription>
                  Based on your location, requirements, and ratings
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {availableTechnicians.map((tech) => (
                <div
                  key={tech.id}
                  className={`cursor-pointer transition-all ${selectedTechnician?.id === tech.id ? 'ring-2 ring-primary rounded-lg' : ''
                    }`}
                  onClick={() => setSelectedTechnician(tech)}
                >
                  <TechnicianCard technician={tech} />
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={!selectedTechnician}>
                Next: Confirm Booking
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && selectedTechnician && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Confirm Your Booking
              </CardTitle>
              <CardDescription>Review your booking details before confirming</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Service Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Service:</span> {service?.name}</p>
                      <p><span className="text-muted-foreground">Description:</span> {bookingData.description}</p>
                      <p className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        {bookingData.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(bookingData.date).toLocaleDateString()} at {bookingData.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Technician</h3>
                    <div className="p-4 bg-accent rounded-lg">
                      <p className="font-semibold">{selectedTechnician.name}</p>
                      <p className="text-sm text-muted-foreground">⭐ {selectedTechnician.rating} ({selectedTechnician.totalJobs} jobs)</p>
                      <p className="text-sm">₹{selectedTechnician.hourlyRate}/hr</p>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Cost Estimate</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Base Rate:</span>
                        <span>₹{service?.averagePrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Technician Rate:</span>
                        <span>₹{selectedTechnician.hourlyRate}/hr</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                        <span>Estimated Total:</span>
                        <span className="text-primary">₹{(service?.averagePrice || 0) + selectedTechnician.hourlyRate}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Final cost may vary based on actual work required
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button size="lg" onClick={handleConfirm}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Confirm & Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Booking;
