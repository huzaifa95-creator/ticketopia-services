
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { eventService } from "@/services/eventService";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  image: string;
  category: string;
  organizer: string;
  featured: boolean;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getEvents();
      setEvents(data);
      setFeaturedEvents(data.filter(event => event.featured));
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  return {
    events,
    featuredEvents,
    isLoading,
    error,
    getEventById,
    refetch: fetchEvents
  };
}
