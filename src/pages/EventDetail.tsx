
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, BadgeIcon } from "lucide-react";
import { eventService } from "@/services/eventService";
import { bookingService } from "@/services/bookingService";
import { Event } from "@/hooks/use-events";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1);
  const [availability, setAvailability] = useState({ available: false, remainingSeats: 0 });
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const eventData = await eventService.getEventById(id);
        setEvent(eventData);
        
        const availabilityData = await eventService.checkEventAvailability(id);
        setAvailability(availabilityData);
      } catch (error) {
        console.error("Error loading event:", error);
        toast({
          title: "Error",
          description: "Failed to load event details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [id, toast]);

  const handleTicketCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setTicketCount(1);
    } else if (value > availability.remainingSeats) {
      setTicketCount(availability.remainingSeats);
    } else {
      setTicketCount(value);
    }
  };

  const handleBooking = async () => {
    if (!event) return;
    
    setIsBooking(true);
    try {
      // Check if user is logged in (simplified for demo)
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login with return URL
        navigate(`/login?redirect=/events/${id}`);
        return;
      }
      
      const booking = await bookingService.createBooking({
        eventId: event.id,
        ticketCount: ticketCount,
      });
      
      toast({
        title: "Booking Confirmed!",
        description: `Successfully booked ${ticketCount} ticket(s) for ${event.title}. Check your email for details.`,
      });
      
      // Redirect to bookings page after successful booking
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/events")}>Browse Other Events</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-primary" />
                <span>Capacity: {event.capacity}</span>
              </div>
              <div className="flex items-center">
                <BadgeIcon className="h-5 w-5 mr-2 text-primary" />
                <span>{event.category}</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="text-base leading-relaxed mb-6">{event.description}</p>
            
            <h2 className="text-xl font-semibold mb-4">Organized By</h2>
            <p className="text-base leading-relaxed">{event.organizer}</p>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Tickets</h2>
                <p className="text-2xl font-bold mb-6">${event.price.toFixed(2)}<span className="text-base font-normal text-muted-foreground"> per ticket</span></p>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Number of Tickets</label>
                  <Input
                    type="number"
                    min="1"
                    max={availability.remainingSeats}
                    value={ticketCount}
                    onChange={handleTicketCountChange}
                    disabled={!availability.available}
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Price ({ticketCount} × ${event.price.toFixed(2)})</span>
                    <span>${(ticketCount * event.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Service Fee</span>
                    <span>${(ticketCount * 2.5).toFixed(2)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(ticketCount * (event.price + 2.5)).toFixed(2)}</span>
                  </div>
                </div>
                
                {availability.available ? (
                  <>
                    <p className="text-sm text-green-600 mb-4">
                      {availability.remainingSeats} tickets left
                    </p>
                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={handleBooking}
                      disabled={isBooking}
                    >
                      {isBooking ? "Processing..." : "Book Now"}
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-destructive mb-4">
                      Sold Out
                    </p>
                    <Button className="w-full" size="lg" variant="outline" disabled>
                      Not Available
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
