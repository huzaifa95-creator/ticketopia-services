
interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  ticketCount: number;
  totalPrice: number;
  bookingDate: string;
}

interface CreateBookingRequest {
  eventId: string;
  ticketCount: number;
  userId?: string; // Optional because it might be extracted from token on server
}

const API_URL = "http://localhost:5002"; // Booking Service on port 5002

export const bookingService = {
  createBooking: async (bookingData: CreateBookingRequest): Promise<Booking> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Booking error:", error);
      throw error;
    }
  },

  getUserBookings: async (): Promise<Booking[]> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/api/bookings/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  },

  cancelBooking: async (bookingId: string): Promise<{ success: boolean, message: string }> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/api/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  }
};
