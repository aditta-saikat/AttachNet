import api from "../api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}

// Validation functions
const validateLoginRequest = (credentials: LoginRequest): void => {
  if (!credentials.email?.trim()) {
    throw new Error("Email is required");
  }
  if (!credentials.password?.trim()) {
    throw new Error("Password is required");
  }
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(credentials.email)) {
    throw new Error("Invalid email format");
  }
};

const validateSignupRequest = (userData: SignupRequest): void => {
  if (!userData.username?.trim()) {
    throw new Error("Username is required");
  }
  if (!userData.email?.trim()) {
    throw new Error("Email is required");
  }
  if (!userData.password?.trim()) {
    throw new Error("Password is required");
  }
  if (!userData.phone?.trim()) {
    throw new Error("Phone is required");
  }
  if (!userData.role?.trim()) {
    throw new Error("Role is required");
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Invalid email format");
  }

  // Basic phone format validation
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(userData.phone)) {
    throw new Error("Invalid phone number format");
  }
};

class AuthService {
  private handleApiError(error: any, defaultMessage: string): never {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(defaultMessage);
  }

  private setAuthData(token: string, user: User): void {
    if (!token || !user) {
      throw new Error("Invalid authentication data");
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      validateLoginRequest(credentials);
      const response = await api.post<AuthResponse>(
        "/users/login",
        credentials,
      );

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Invalid response from server");
      }

      this.setAuthData(response.data.token, response.data.user);
      return response.data;
    } catch (error: any) {
      this.handleApiError(error, "Invalid login credentials");
    }
  }

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      validateSignupRequest(userData);
      const response = await api.post<AuthResponse>("/users", userData);

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Invalid response from server");
      }

      this.setAuthData(response.data.token, response.data.user);
      return response.data;
    } catch (error: any) {
      this.handleApiError(error, "Signup failed. Please try again.");
    }
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;

      const user = JSON.parse(userStr);
      if (!user.id || !user.email || !user.username) {
        this.logout(); // Clear invalid data
        return null;
      }

      return user;
    } catch {
      this.logout(); // Clear invalid data
      return null;
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem("token");
    return token || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await api.get("/auth/verify");
      return response.status === 200;
    } catch {
      return false;
    }
  }

  // Enhanced User Management Methods
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>("/users");

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format");
      }

      // Validate each user object
      return response.data.map((user) => {
        if (!user.id || !user.email || !user.username) {
          throw new Error("Invalid user data received");
        }
        return user;
      });
    } catch (error: any) {
      this.handleApiError(error, "Failed to fetch users");
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      if (!id?.trim()) {
        throw new Error("User ID is required");
      }

      const response = await api.get<User>(`/users/${id}`);

      if (
        !response.data?.id ||
        !response.data?.email ||
        !response.data?.username
      ) {
        throw new Error("Invalid user data received");
      }

      return response.data;
    } catch (error: any) {
      this.handleApiError(error, `Failed to fetch user with ID: ${id}`);
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      if (!id?.trim()) {
        throw new Error("User ID is required");
      }

      // Validate update data
      if (userData.email && !userData.email.trim()) {
        throw new Error("Invalid email");
      }
      if (userData.username && !userData.username.trim()) {
        throw new Error("Invalid username");
      }
      if (userData.phone && !userData.phone.trim()) {
        throw new Error("Invalid phone");
      }

      const response = await api.put<User>(`/users/${id}`, userData);

      if (
        !response.data?.id ||
        !response.data?.email ||
        !response.data?.username
      ) {
        throw new Error("Invalid user data received");
      }

      return response.data;
    } catch (error: any) {
      this.handleApiError(error, `Failed to update user with ID: ${id}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      if (!id?.trim()) {
        throw new Error("User ID is required");
      }

      await api.delete(`/users/${id}`);
    } catch (error: any) {
      this.handleApiError(error, `Failed to delete user with ID: ${id}`);
    }
  }
}

export default new AuthService();
