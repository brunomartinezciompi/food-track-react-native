/**
 * App Configuration
 * Handles environment variables and configuration for different environments
 */

export interface AppConfig {
  environment: 'development' | 'production'
  supabase: {
    url: string
    anonKey: string
  }
  social: {
    google: {
      iosClientId: string
      androidClientId: string
    }
    apple: {
      clientId: string
    }
  }
  analytics?: {
    key: string
  }
}

const getEnvVar = (name: string): string => {
  const value = process.env[name]
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const getOptionalEnvVar = (name: string): string | undefined => {
  return process.env[name]
}

/**
 * Create configuration object from environment variables
 */
const createConfig = (): AppConfig => {
  const environment = (process.env.NODE_ENV as AppConfig['environment']) || 'development'
  
  const supabaseUrl = getEnvVar('EXPO_PUBLIC_SUPABASE_URL')
  const supabaseAnonKey = getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY')
  
  if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('supabase.co')) {
    throw new Error('Invalid SUPABASE_URL format')
  }
  
  return {
    environment,
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    social: {
      google: {
        iosClientId: getOptionalEnvVar('EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS') || '',
        androidClientId: getOptionalEnvVar('EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID') || '',
      },
      apple: {
        clientId: getOptionalEnvVar('EXPO_PUBLIC_APPLE_CLIENT_ID') || '',
      },
    },
    analytics: getOptionalEnvVar('EXPO_PUBLIC_ANALYTICS_KEY') ? {
      key: getOptionalEnvVar('EXPO_PUBLIC_ANALYTICS_KEY')!,
    } : undefined,
  }
}


export const config = createConfig()
export const isDevelopment = config.environment === 'development'
export const isProduction = config.environment === 'production'

if (isDevelopment) {
  console.log('🔧 App Configuration:', {
    environment: config.environment,
    supabaseUrl: config.supabase.url,
    hasSupabaseKey: !!config.supabase.anonKey,
    socialConfigured: {
      google: !!config.social.google.iosClientId,
      apple: !!config.social.apple.clientId,
    },
  })
} 