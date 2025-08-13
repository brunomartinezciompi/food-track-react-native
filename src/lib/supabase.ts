import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import type { AuthError } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from './config';
import { AUTH_ERROR_MESSAGES } from '@/types/auth';

export const supabase = createClient(config.supabase.url, config.supabase.anonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper function to get user-friendly error messages
export function getAuthErrorMessage(error: AuthError | Error | null): string {
  if (!error) return AUTH_ERROR_MESSAGES.default;
  
  // Check if it's a Supabase AuthApiError with a code
  if ('code' in error && error.code && AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES]) {
    return AUTH_ERROR_MESSAGES[error.code as keyof typeof AUTH_ERROR_MESSAGES];
  }
  
  // Fallback to message if no code is available
  if (error.message) {
    console.warn('Unhandled auth error:', error.message, 'Code:', 'code' in error ? error.code : 'N/A');
    return error.message;
  }
  
  return AUTH_ERROR_MESSAGES.default;
}