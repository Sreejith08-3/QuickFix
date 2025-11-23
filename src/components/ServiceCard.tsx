import { Service } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

export const ServiceCard = ({ service, onBook }: ServiceCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
      <CardHeader className="relative z-10">
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Starting from</span>
          <span className="font-semibold text-primary">₹{service.averagePrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium">{service.estimatedDuration}</span>
        </div>
        <Button 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant="outline"
          onClick={() => onBook(service)}
        >
          Book Now
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};
