import { useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { mockServices } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookService = (service: Service) => {
    navigate(`/booking?service=${service.category}`);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-accent/30 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Professional home repair and maintenance services across Kerala
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredServices.map((service, index) => (
            <div key={service.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <ServiceCard 
                service={service}
                onBook={handleBookService}
              />
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
