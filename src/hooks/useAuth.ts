import { useAuthContext } from '../contexts/AuthContext';

/**
 * Hook for authentication operations
 * Now uses AuthContext for centralized state management
 * @deprecated Consider using useAuthContext directly for better clarity
 */
export function useAuth() {
  const { 
    isLoading, 
    signUp, 
    signIn, 
    signOut,
    user,
    session,
    isAuthenticated 
  } = useAuthContext();

  return {
    loading: isLoading,
    signUp,
    signIn,
    signOut,
    user,
    session,
    isAuthenticated,
  };
} 