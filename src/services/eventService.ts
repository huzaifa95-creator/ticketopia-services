
import { Event } from "@/hooks/use-events";

// Mock data for development - this will be replaced with actual API calls
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Join us for the biggest tech conference of the year, featuring speakers from leading tech companies and workshops on the latest technologies.",
    date: "2024-08-15",
    time: "10:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    price: 299,
    capacity: 1000,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Technology",
    organizer: "TechEvents Inc",
    featured: true
  },
  {
    id: "2",
    title: "Summer Music Festival",
    description: "A weekend of incredible music featuring top artists across multiple genres. Food, camping, and unforgettable experiences.",
    date: "2024-07-20",
    time: "12:00 PM - 11:00 PM",
    location: "Golden Gate Park",
    price: 150,
    capacity: 5000,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Music",
    organizer: "Festival Productions",
    featured: true
  },
  {
    id: "3",
    title: "Business Leadership Summit",
    description: "Learn from industry leaders about effective management strategies, innovation, and growing your business in today's competitive market.",
    date: "2024-09-10",
    time: "9:00 AM - 4:00 PM",
    location: "Downtown Business Center",
    price: 399,
    capacity: 500,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Business",
    organizer: "Leadership Academy",
    featured: true
  },
  {
    id: "4",
    title: "Food & Wine Festival",
    description: "Sample exquisite dishes from top chefs and taste premium wines from around the world at this culinary celebration.",
    date: "2024-10-05",
    time: "11:00 AM - 8:00 PM",
    location: "Waterfront Park",
    price: 85,
    capacity: 2000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Food & Drink",
    organizer: "Culinary Events Co",
    featured: false
  },
  {
    id: "5",
    title: "Fitness Expo",
    description: "Discover the latest fitness trends, equipment, supplements, and training methodologies. Meet fitness influencers and get personalized advice.",
    date: "2024-11-12",
    time: "10:00 AM - 6:00 PM",
    location: "Sports Complex",
    price: 45,
    capacity: 3000,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Health & Fitness",
    organizer: "FitLife Events",
    featured: false
  }
];

const API_URL = "http://localhost:5001"; // Event Service on port 5001

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    // This would be an actual API call in production
    // try {
    //   const response = await fetch(`${API_URL}/events`);
    //   if (!response.ok) throw new Error('Failed to fetch events');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Error fetching events:", error);
    //   throw error;
    // }
    
    // For now, return mock data with a delay to simulate network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_EVENTS);
      }, 800);
    });
  },

  getEventById: async (eventId: string): Promise<Event> => {
    // This would be an actual API call in production
    // try {
    //   const response = await fetch(`${API_URL}/events/${eventId}`);
    //   if (!response.ok) throw new Error('Failed to fetch event');
    //   return await response.json();
    // } catch (error) {
    //   console.error(`Error fetching event ${eventId}:`, error);
    //   throw error;
    // }
    
    // For now, return mock data with a delay to simulate network request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const event = MOCK_EVENTS.find(e => e.id === eventId);
        if (event) {
          resolve(event);
        } else {
          reject(new Error("Event not found"));
        }
      }, 500);
    });
  },

  checkEventAvailability: async (eventId: string): Promise<{ available: boolean, remainingSeats: number }> => {
    // This would be an actual API call in production
    // try {
    //   const response = await fetch(`${API_URL}/events/${eventId}/availability`);
    //   if (!response.ok) throw new Error('Failed to check availability');
    //   return await response.json();
    // } catch (error) {
    //   console.error(`Error checking availability for event ${eventId}:`, error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = MOCK_EVENTS.find(e => e.id === eventId);
        if (event) {
          // Simulate some random availability
          const bookedSeats = Math.floor(Math.random() * event.capacity);
          const remainingSeats = event.capacity - bookedSeats;
          resolve({
            available: remainingSeats > 0,
            remainingSeats
          });
        } else {
          resolve({
            available: false,
            remainingSeats: 0
          });
        }
      }, 300);
    });
  }
};
