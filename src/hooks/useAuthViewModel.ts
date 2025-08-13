import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { supabase, getAuthErrorMessage } from '../lib/supabase';

export const useAuthViewModel = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user && !!session;

  // Initialize auth state and listen for changes
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔐 [AUTH_VM] Initializing authentication...');
        
        // Get existing session - optimistic approach
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ [AUTH_VM] Error getting session:', error);
        } else if (session && mounted) {
          console.log('✅ [AUTH_VM] Existing session found:', {
            userId: session.user.id,
            email: session.user.email,
          });
          setSession(session);
          setUser(session.user);
        } else {
          console.log('ℹ️ [AUTH_VM] No existing session found');
        }
      } catch (error) {
        console.error('💥 [AUTH_VM] Error initializing auth:', error);
      }
      // No more setIsLoading(false) - we start with false
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 [AUTH_VM] Auth state changed:', {
          event,
          userId: session?.user?.id,
          email: session?.user?.email,
        });

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('📝 [AUTH_VM] Starting sign up process:', { email });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('❌ [AUTH_VM] Sign up failed:', error);
        const errorMessage = getAuthErrorMessage(error);
        
        Toast.show({
          type: 'error',
          text1: t('auth.error.registrationTitle'),
          text2: errorMessage,
        });
        return false;
      }

      if (data.user) {
        console.log('✅ [AUTH_VM] Sign up successful:', {
          userId: data.user.id,
          email: data.user.email,
          needsConfirmation: !data.session,
        });

        if (data.session) {
          // User is automatically signed in
          Toast.show({
            type: 'success',
            text1: t('auth.success.registrationTitle'),
            text2: t('auth.success.registrationMessage'),
          });
        } else {
          // User needs to confirm email
          Toast.show({
            type: 'info',
            text1: 'Check your email',
            text2: 'Please check your email to confirm your account',
          });
        }
        return true;
      }

      return false;
    } catch (error) {
      console.error('💥 [AUTH_VM] Unexpected error during sign up:', error);
      Toast.show({
        type: 'error',
        text1: t('auth.error.registrationTitle'),
        text2: t('common.errorMessage'),
      });
      return false;
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔑 [AUTH_VM] Starting sign in process:', { email });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ [AUTH_VM] Sign in failed:', error);
        const errorMessage = getAuthErrorMessage(error);
        
        Toast.show({
          type: 'error',
          text1: t('auth.error.signInTitle'),
          text2: errorMessage,
        });
        return false;
      }

      if (data.user && data.session) {
        console.log('✅ [AUTH_VM] Sign in successful:', {
          userId: data.user.id,
          email: data.user.email,
        });

        Toast.show({
          type: 'success',
          text1: t('auth.success.signInTitle'),
          text2: t('auth.success.signInMessage', { email: data.user.email }),
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('💥 [AUTH_VM] Unexpected error during sign in:', error);
      Toast.show({
        type: 'error',
        text1: t('auth.error.signInTitle'),
        text2: t('common.errorMessage'),
      });
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      console.log('🚪 [AUTH_VM] Starting sign out process');
      setIsLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ [AUTH_VM] Sign out failed:', error);
        Toast.show({
          type: 'error',
          text1: t('auth.error.genericTitle'),
          text2: t('auth.error.signOutMessage'),
        });
      } else {
        console.log('✅ [AUTH_VM] Sign out successful');
        Toast.show({
          type: 'success',
          text1: t('auth.success.signOutTitle'),
          text2: t('auth.success.signOutMessage'),
        });
      }
    } catch (error) {
      console.error('💥 [AUTH_VM] Unexpected error during sign out:', error);
      Toast.show({
        type: 'error',
        text1: t('auth.error.genericTitle'),
        text2: t('common.errorMessage'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper methods
  const getUserProfile = () => {
    return user ? {
      id: user.id,
      email: user.email,
      emailConfirmed: user.email_confirmed_at !== null,
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at,
    } : null;
  };

  const hasValidSession = () => {
    return session && session.expires_at && session.expires_at > Date.now() / 1000;
  };

  return {
    // State
    user,
    session,
    isLoading,
    isAuthenticated,
    
    // Actions
    signUp,
    signIn,
    signOut,
    
    // Queries/Helpers
    getUserProfile,
    hasValidSession,
  };
}; 