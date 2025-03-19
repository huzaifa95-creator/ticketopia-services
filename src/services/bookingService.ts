
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
    // This would be an actual API call in production
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch(`${API_URL}/bookings`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     },
    //     body: JSON.stringify(bookingData)
    //   });
    //   if (!response.ok) throw new Error('Booking failed');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Booking error:", error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "book_" + Math.random().toString(36).substring(2, 11),
          userId: bookingData.userId || "usr_123456",
          eventId: bookingData.eventId,
          status: 'confirmed',
          ticketCount: bookingData.ticketCount,
          totalPrice: 99.99 * bookingData.ticketCount, // Mock price calculation
          bookingDate: new Date().toISOString()
        });
      }, 800);
    });
  },

  getUserBookings: async (userId?: string): Promise<Booking[]> => {
    // This would be an actual API call in production
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch(`${API_URL}/bookings/user`, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   if (!response.ok) throw new Error('Failed to fetch bookings');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Error fetching bookings:", error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "book_123456",
            userId: userId || "usr_123456",
            eventId: "1", // Tech Conference
            status: 'confirmed',
            ticketCount: 2,
            totalPrice: 598, // 299 * 2
            bookingDate: new Date(Date.now() - 86400000 * 3).toISOString() // 3 days ago
          },
          {
            id: "book_234567",
            userId: userId || "usr_123456",
            eventId: "2", // Summer Music Festival
            status: 'confirmed',
            ticketCount: 1,
            totalPrice: 150,
            bookingDate: new Date(Date.now() - 86400000 * 7).toISOString() // 7 days ago
          }
        ]);
      }, 600);
    });
  },

  cancelBooking: async (bookingId: string): Promise<{ success: boolean, message: string }> => {
    // This would be an actual API call in production
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   if (!response.ok) throw new Error('Failed to cancel booking');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Error cancelling booking:", error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Booking cancelled successfully"
        });
      }, 500);
    });
  }
};
