import { Technician } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Briefcase, CheckCircle } from 'lucide-react';

interface TechnicianCardProps {
  technician: Technician;
  onSelect?: (technician: Technician) => void;
}

const badgeLabels: Record<string, string> = {
  super_technician: 'Super Technician',
  fast_responder: 'Fast Responder',
  highly_rated: 'Highly Rated',
  expert_specialist: 'Expert Specialist',
};

export const TechnicianCard = ({ technician, onSelect }: TechnicianCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-card/40 backdrop-blur-sm border-border/50 hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
      <CardHeader className="relative z-10">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={technician.avatar} alt={technician.name} />
            <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{technician.name}</h3>
              {technician.verified && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">{technician.rating}</span>
              <span>({technician.totalJobs} jobs)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary">₹{technician.hourlyRate}/hr</div>
            {technician.availability ? (
              <Badge variant="default" className="mt-1">Available</Badge>
            ) : (
              <Badge variant="secondary" className="mt-1">Busy</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <p className="text-sm text-muted-foreground line-clamp-2">{technician.bio}</p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {technician.location}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          {technician.experience} years experience
        </div>

        <div className="flex flex-wrap gap-2">
          {technician.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="capitalize">
              {skill}
            </Badge>
          ))}
        </div>

        {technician.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technician.badges.map((badge) => (
              <Badge key={badge} className="bg-accent text-accent-foreground">
                {badgeLabels[badge]}
              </Badge>
            ))}
          </div>
        )}

        {onSelect && (
          <Button 
            className="w-full" 
            onClick={() => onSelect(technician)}
            disabled={!technician.availability}
          >
            {technician.availability ? 'Select Technician' : 'Not Available'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
