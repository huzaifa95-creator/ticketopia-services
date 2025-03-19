
import { Event } from "@/hooks/use-events";

const API_URL = "http://localhost:5001"; // Event Service on port 5001

export const eventService = {
  getEvents: async (): Promise<Event[]> => {
    try {
      const response = await fetch(`${API_URL}/api/events`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch events');
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  getEventById: async (eventId: string): Promise<Event> => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch event');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error);
      throw error;
    }
  },

  createEvent: async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  },

  checkEventAvailability: async (eventId: string): Promise<{ available: boolean, remainingSeats: number }> => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}/availability`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check availability');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error checking availability for event ${eventId}:`, error);
      throw error;
    }
  }
};
