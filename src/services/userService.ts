
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:5000"; // User Service on port 5000

export const userService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // This would be an actual API call in production
    // try {
    //   const response = await fetch(`${API_URL}/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    //   });
    //   if (!response.ok) throw new Error('Login failed');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Login error:", error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (credentials.email && credentials.password) {
          resolve({
            user: {
              id: "usr_123456",
              name: "Test User",
              email: credentials.email,
              role: "user"
            },
            token: "mock_jwt_token_would_be_here"
          });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    // This would be an actual API call in production
    // try {
    //   const response = await fetch(`${API_URL}/auth/signup`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    //   });
    //   if (!response.ok) throw new Error('Signup failed');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Signup error:", error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (credentials.name && credentials.email && credentials.password) {
          resolve({
            user: {
              id: "usr_" + Math.random().toString(36).substring(2, 11),
              name: credentials.name,
              email: credentials.email,
              role: "user"
            },
            token: "mock_jwt_token_would_be_here"
          });
        } else {
          reject(new Error("Please fill in all required fields"));
        }
      }, 700);
    });
  },

  getProfile: async (): Promise<User> => {
    // This would use the stored token to get the user profile
    // try {
    //   const token = localStorage.getItem('token');
    //   const response = await fetch(`${API_URL}/users/profile`, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   if (!response.ok) throw new Error('Failed to fetch profile');
    //   return await response.json();
    // } catch (error) {
    //   console.error("Profile fetch error:", error);
    //   throw error;
    // }
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "usr_123456",
          name: "Test User",
          email: "test@example.com",
          role: "user"
        });
      }, 300);
    });
  }
};
