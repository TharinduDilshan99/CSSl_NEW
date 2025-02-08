// src/types/auth.types.ts

export interface LoginResponse {
    User?: {
      userRoleID: number;
      // Add other user properties as needed
    };
  }
  
  export interface AuthLoginProps {
    isDemo?: boolean;
    onLoginSuccess: (response: LoginResponse) => void;
  }