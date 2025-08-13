import React, { createContext, useContext, ReactNode } from 'react';
import { useAuthViewModel } from '@/hooks/useAuthViewModel';

// Auth context type (same as view model return type)
type AuthContextType = ReturnType<typeof useAuthViewModel>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authViewModel = useAuthViewModel();

  return (
    <AuthContext.Provider value={authViewModel}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 