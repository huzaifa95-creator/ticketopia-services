
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { CalendarIcon, ClockIcon, TicketIcon } from "lucide-react";
import { bookingService } from "@/services/bookingService";
import { eventService } from "@/services/eventService";
import { Event } from "@/hooks/use-events";

interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  ticketCount: number;
  totalPrice: number;
  bookingDate: string;
  event?: Event;
}

const MyBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBookings = async () => {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login?redirect=/my-bookings");
        return;
      }
      
      setIsLoading(true);
      try {
        // Fetch user's bookings
        const bookingsData = await bookingService.getUserBookings();
        
        // Fetch event details for each booking
        const bookingsWithEvents = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const event = await eventService.getEventById(booking.eventId);
              return { ...booking, event };
            } catch (error) {
              console.error(`Error fetching event ${booking.eventId}:`, error);
              return booking;
            }
          })
        );
        
        setBookings(bookingsWithEvents);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load your bookings. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [navigate, toast]);
  
  const handleCancelBooking = async (bookingId: string) => {
    setCancelingId(bookingId);
    try {
      await bookingService.cancelBooking(bookingId);
      
      // Update the local state to reflect cancellation
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-1/4" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Bookings Found</h2>
            <p className="text-muted-foreground mb-6">You haven't booked any events yet.</p>
            <Button onClick={() => navigate("/events")}>Browse Events</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <CardTitle>{booking.event?.title || "Event details unavailable"}</CardTitle>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : booking.status === 'cancelled' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {booking.event ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className="aspect-video rounded-md overflow-hidden">
                          <img 
                            src={booking.event.image} 
                            alt={booking.event.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                            <span>{new Date(booking.event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="mr-2 h-4 w-4 text-primary" />
                            <span>{booking.event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <TicketIcon className="mr-2 h-4 w-4 text-primary" />
                            <span>{booking.ticketCount} {booking.ticketCount === 1 ? 'ticket' : 'tickets'}</span>
                          </div>
                          <div>
                            <span className="font-semibold">Total:</span> ${booking.totalPrice.toFixed(2)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Event details are not available. The event may have been removed.</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/events/${booking.eventId}`)}
                  >
                    View Event
                  </Button>
                  
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="destructive"
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancelingId === booking.id}
                    >
                      {cancelingId === booking.id ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookings;
